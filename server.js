
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

require('dotenv').config();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.query('SELECT NOW()')
  .then(res => console.log('PostgreSQL connected to ticktracker at:', res.rows[0].now))
  .catch(err => console.error('Database connection error:', err.stack));

async function syncExternalDataToDB() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tick_sightings (
        id VARCHAR(255) PRIMARY KEY,
        species VARCHAR(255) NOT NULL,
        latin_name VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        date TIMESTAMPTZ NOT NULL
      );
    `);

    const res = await fetch('https://dev-task.elancoapps.com/data/tick-sightings');
    if (!res.ok) throw new Error(`External API returned status ${res.status}`);
    const rawData = await res.json();

    const validData = rawData.filter(item => item.location && item.date && item.species);

    for (const item of validData) {
      await db.query(`
        INSERT INTO tick_sightings (id, species, latin_name, location, date)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO NOTHING;
      `, [item.id, item.species, item.latinName || null, item.location, item.date]);
    }

    console.log('Database successfully synced with external API.');
  } catch (err) {
    console.error('Failed database sync:', err.message);
  }
}


// Get all sightings
app.get('/tick-sightings', async (req, res, next) => {
  try {
    const result = await db.query('SELECT id, species, latin_name AS "latinName", location, date FROM tick_sightings ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});
// Filter by species
app.get('/tick-sightings/species/:species', async (req, res, next) => {
  try {
    const { species } = req.params;
    const result = await db.query(
      'SELECT id, species, latin_name AS "latinName", location, date FROM tick_sightings WHERE LOWER(species) = LOWER($1) ORDER BY date DESC',
      [species]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Filter by city
app.get('/tick-sightings/city/:city', async (req, res, next) => {
  try {
    const { city } = req.params;
    const result = await db.query(
      'SELECT id, species, latin_name AS "latinName", location, date FROM tick_sightings WHERE LOWER(location) = LOWER($1) ORDER BY date DESC',
      [city]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});


// Submit a new sighting from form
app.post('/tick-sightings', async (req, res) => {
  try {
    const { species, location, date, latinName } = req.body;


    if (!species || !location || !date) {
      return res.status(400).json({ error: 'Species, location, and date are required.' });
    }

    const formattedDate = new Date(date).toISOString();

    const id = `user_${Date.now()}`;
    const result = await db.query(`
      INSERT INTO tick_sightings (id, species, latin_name, location, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, species, latin_name AS "latinName", location, date;
    `, [id, species, latinName || null, location, formattedDate|| null]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database insertion failed.' });
  }
});



// Calculate severity based on historical averages
app.get('/city-summary', async (req, res, next) => {
  try {
    const result = await db.query('SELECT location, date FROM tick_sightings');
    const sightings = result.rows;

    const cityData = {};
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    //  Tally historical and recent sightings per city
    sightings.forEach(s => {
      const city = s.location;
      if (!cityData[city]) {
        cityData[city] = { total: 0, recent: 0, firstSighting: now };
      }
      
      const sDate = new Date(s.date);
      cityData[city].total += 1;
      
      if (sDate >= thirtyDaysAgo) {
        cityData[city].recent += 1; // Count cases in the current month
      }
      if (sDate < cityData[city].firstSighting) {
        cityData[city].firstSighting = sDate; // Track oldest sighting
      }
    });

    // Compare current cases to historical averages
    const summaries = {};
    for (const city in cityData) {
      const data = cityData[city];
      
      // Calculate total months the city has been active (minimum 1)
      const msDiff = now - data.firstSighting;
      const monthsActive = Math.max(msDiff / (1000 * 60 * 60 * 24 * 30), 1);
      
      const historicalMonthlyAvg = data.total / monthsActive;
      const currentMonthlyCases = data.recent;

      let severityClass = 'marker-low'; // Green (Default)

      if (currentMonthlyCases > historicalMonthlyAvg * 1.5) {
        severityClass = 'marker-high'; // Red (Significantly higher than average)
      } else if (currentMonthlyCases > historicalMonthlyAvg) {
        severityClass = 'marker-medium'; // Orange (Slightly higher than average)
      }

      summaries[city] = { severityClass };
    }

    res.json(summaries);
  } catch (err) {
    next(err);
  }
});




// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Database/Server Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});



app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await syncExternalDataToDB();
  
  // Re-sync every 30 minutes
  setInterval(syncExternalDataToDB, 30 * 60 * 1000);
});