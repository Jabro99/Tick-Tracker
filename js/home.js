// 1. Full UK City Coordinate Lookup (Expanded for your static dataset)
const CITY_COORDINATES = {
  "Aberdeen": { lat: 57.1497, lng: -2.0943 },
  "Armagh": { lat: 54.3499, lng: -6.6546 },
  "Bangor (NI)": { lat: 54.6609, lng: -5.6667 },
  "Bangor (Wales)": { lat: 53.2274, lng: -4.1293 },
  "Bath": { lat: 51.3781, lng: -2.3597 },
  "Belfast": { lat: 54.5973, lng: -5.9301 },
  "Birmingham": { lat: 52.4862, lng: -1.8904 },
  "Bradford": { lat: 53.7938, lng: -1.7522 },
  "Brighton": { lat: 50.8225, lng: -0.1372 },
  "Bristol": { lat: 51.4545, lng: -2.5879 },
  "Cambridge": { lat: 52.2053, lng: 0.1218 },
  "Canterbury": { lat: 51.2802, lng: 1.0789 },
  "Cardiff": { lat: 51.4815, lng: -3.1791 },
  "Carlisle": { lat: 54.8925, lng: -2.9329 },
  "Chelmsford": { lat: 51.7356, lng: 0.4685 },
  "Chester": { lat: 53.1934, lng: -2.8931 },
  "Chichester": { lat: 50.8376, lng: -0.7749 },
  "Colchester": { lat: 51.8959, lng: 0.9005 },
  "Coventry": { lat: 52.4068, lng: -1.5197 },
  "Derby": { lat: 52.9225, lng: -1.4746 },
  "Derry": { lat: 55.0068, lng: -7.3183 },
  "Doncaster": { lat: 53.5228, lng: -1.1288 },
  "Dundee": { lat: 56.4620, lng: -2.9707 },
  "Dunfermline": { lat: 56.0719, lng: -3.4393 },
  "Durham": { lat: 54.7753, lng: -1.5849 },
  "Edinburgh": { lat: 55.9533, lng: -3.1883 },
  "Ely": { lat: 52.3995, lng: 0.2624 },
  "Exeter": { lat: 50.7260, lng: -3.5275 },
  "Glasgow": { lat: 55.8642, lng: -4.2518 },
  "Gloucester": { lat: 51.8642, lng: -2.2382 },
  "Hereford": { lat: 52.0567, lng: -2.7160 },
  "Inverness": { lat: 57.4778, lng: -4.2247 },
  "Kingston upon Hull": { lat: 53.7676, lng: -0.3274 },
  "Lancaster": { lat: 54.0470, lng: -2.8013 },
  "Leeds": { lat: 53.8008, lng: -1.5491 },
  "Leicester": { lat: 52.6369, lng: -1.1398 },
  "Lichfield": { lat: 52.6816, lng: -1.8260 },
  "Lincoln": { lat: 53.2307, lng: -0.5406 },
  "Lisburn": { lat: 54.5126, lng: -6.0390 },
  "Liverpool": { lat: 53.4084, lng: -2.9916 },
  "London": { lat: 51.5074, lng: -0.1278 },
  "Manchester": { lat: 53.4808, lng: -2.2426 },
  "Milton Keynes": { lat: 52.0406, lng: -0.7594 },
  "Newcastle": { lat: 54.9783, lng: -1.6178 },
  "Newport": { lat: 51.5842, lng: -2.9977 },
  "Newry": { lat: 54.1751, lng: -6.3371 },
  "Norwich": { lat: 52.6309, lng: 1.2974 },
  "Nottingham": { lat: 52.9548, lng: -1.1581 },
  "Oxford": { lat: 51.7520, lng: -1.2577 },
  "Perth": { lat: 56.3950, lng: -3.4308 },
  "Peterborough": { lat: 52.5739, lng: -0.2508 },
  "Plymouth": { lat: 50.3755, lng: -4.1427 },
  "Portsmouth": { lat: 50.8198, lng: -1.0880 },
  "Preston": { lat: 53.7632, lng: -2.7031 },
  "Ripon": { lat: 54.1374, lng: -1.5173 },
  "Salford": { lat: 53.4875, lng: -2.2901 },
  "Salisbury": { lat: 51.0683, lng: -1.7946 },
  "Sheffield": { lat: 53.3811, lng: -1.4701 },
  "Southampton": { lat: 50.9097, lng: -1.4044 },
  "Southend-on-Sea": { lat: 51.5385, lng: 0.7135 },
  "St Albans": { lat: 51.7527, lng: -0.3394 },
  "St Asaph": { lat: 53.2570, lng: -3.4402 },
  "St Davids": { lat: 51.8820, lng: -5.2690 },
  "Stirling": { lat: 56.1165, lng: -3.9369 },
  "Stoke-on-Trent": { lat: 53.0027, lng: -2.1794 },
  "Sunderland": { lat: 54.9069, lng: -1.3838 },
  "Swansea": { lat: 51.6214, lng: -3.9436 },
  "Truro": { lat: 50.2599, lng: -5.0510 },
  "Wakefield": { lat: 53.6800, lng: -1.4975 },
  "Wells": { lat: 51.2090, lng: -2.6397 },
  "Winchester": { lat: 51.0632, lng: -1.3080 },
  "Wolverhampton": { lat: 52.5862, lng: -2.1288 },
  "Worcester": { lat: 52.1936, lng: -2.2215 },
  "Wrexham": { lat: 53.0441, lng: -2.9972 },
  "York": { lat: 53.9591, lng: -1.0815 }
};

const API_BASE_URL = "http://localhost:3000"

// Initialises map (locked onto UK)
const ukBounds = L.latLngBounds(
  L.latLng(49.8, -10.8),
  L.latLng(60.9, 2.0)
);

const map = L.map('map', {
  zoomControl: false,
  maxBounds: ukBounds,
  maxBoundsViscosity: 1.0,
  minZoom: 6,
  maxZoom: 18
}).setView([55.0, -3.5], 6);

L.tileLayer(`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${window.CARTO_API_KEY}`, {
  maxZoom: 19,
  subdomains: 'abcd',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

const sightingLayerGroup = L.layerGroup().addTo(map);

// API calls

async function fetchAllSightings() {
  const res = await fetch(`${API_BASE_URL}/tick-sightings`);
  if (!res.ok) throw new Error('Failed to fetch all sightings');
  return await res.json();
}


async function fetchSightingsByCity(city) {
  const res = await fetch(`${API_BASE_URL}/tick-sightings/city/${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Failed to fetch sightings for ${city}`);
  return await res.json();
}

async function fetchSightingsBySpecies(species) {
  const res = await fetch(`${API_BASE_URL}/tick-sightings/species/${encodeURIComponent(species)}`);
  if (!res.ok) throw new Error(`Failed to fetch sightings for species ${species}`);
  return await res.json();
}





// Aggregate Sightings by City
function aggregateSightingsByCity(sightings) {
  return sightings.reduce((acc, sighting) => {
    const city = sighting.location;
    if (!acc[city]) {
      acc[city] = { city, count: 0, sightings: [] };
    }
    acc[city].count += 1;
    acc[city].sightings.push(sighting);
    return acc;
  }, {});
}

// City Marker Renderer
async function renderCityMarkers(groupedData, map, layerGroup) {
  layerGroup.clearLayers();

  let summaries = {};
  try {
    summaries = await fetchCitySummaries();
  } catch (err) {
    console.error('Could not load severity analytics', err);
  }

  Object.values(groupedData).forEach(group => {
    const coords = CITY_COORDINATES[group.city];
    if (!coords) return;

    //  Tick Outbreak Display Severity
    const citySummary = summaries[group.city];
    const severityClass = citySummary ? citySummary.severityClass : 'marker-low';
    
    let severityText = 'Low';
    if (severityClass === 'marker-medium') severityText = 'Medium';
    if (severityClass === 'marker-high') severityText = 'High';

    const cityMarkerIcon = L.divIcon({
      className: 'city-sighting-marker-wrapper',
      html: `
        <div class="city-sighting-marker ${severityClass}">
          <span class="city-marker-count">${group.count}</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([coords.lat, coords.lng], { icon: cityMarkerIcon });

    marker.on('click', async () => {
      try {
        const cityData = await fetchSightingsByCity(group.city);
        openCityModal({
          city: group.city,
          count: cityData.length,
          sightings: cityData,
          severityLevel: severityText
        });
      } catch (err) {
        console.error('Error fetching city details:', err);
      }
    });

    layerGroup.addLayer(marker);
  });
}


// Filter Logic

async function applyFilters() {
  const selectedSpecies = document.getElementById('species-filter').value;
  const startDate = document.getElementById('date-filter-start').value;
  const endDate = document.getElementById('date-filter-end').value;

  try {
    let sightings;
    if (selectedSpecies !== 'all') {
      sightings = await fetchSightingsBySpecies(selectedSpecies);
    } else {
      sightings = await fetchAllSightings();
    }

    if (startDate || endDate) {
      sightings = sightings.filter(sighting => {
        const sightingDate = new Date(sighting.date);
        if (startDate && sightingDate < new Date(startDate)) return false;
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          if (sightingDate > end) return false;
        }
        return true;
      });
    }

    const groupedData = aggregateSightingsByCity(sightings);
    await renderCityMarkers(groupedData, map, sightingLayerGroup);
  } catch (err) {
    console.error('Error applying filters:', err);
  }
}

function clearFilters() {
  document.getElementById('species-filter').value = 'all';
  document.getElementById('date-filter-start').value = '';
  document.getElementById('date-filter-end').value = '';
  applyFilters();
}



function openCityModal(group) {
  document.getElementById('city-modal-title').textContent = group.city;
  document.getElementById('city-modal-count').textContent = `${group.count} Total Sightings`;
  document.getElementById('city-modal-title').textContent = group.city;
  
  const severityLabel = group.severityLevel || 'Low';
  document.getElementById('city-modal-count').innerHTML = `
    ${group.count} Total Sightings 
    <span class="severity-badge badge-${severityLabel.toLowerCase()}">Severity: ${severityLabel}</span>
  `;

  const listContainer = document.getElementById('city-sighting-list');
  listContainer.innerHTML = '';

  const sortedSightings = group.sightings.sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedSightings.forEach(sighting => {
    const dateObj = new Date(sighting.date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const itemDiv = document.createElement('div');
    itemDiv.className = 'sighting-item';
    const latinDisplay = sighting.latinName ? ` (${sighting.latinName})` : '';
    itemDiv.innerHTML = `
      <span class="sighting-item-species">${sighting.species}${latinDisplay}</span>
      <span class="sighting-item-date">${formattedDate}</span>
    `;


    listContainer.appendChild(itemDiv);
  });

  const coords = CITY_COORDINATES[group.city];
  if (coords) {
    document.getElementById('directions-city-btn').href = 
      `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;

    const shareBtn = document.getElementById('share-city-btn');
    shareBtn.dataset.city = group.city;
    shareBtn.dataset.count = group.count;
    shareBtn.dataset.lat = coords.lat;
    shareBtn.dataset.lng = coords.lng;
  }

  document.getElementById('city-modal').style.display = 'flex';
}

function closeCityModal() {
  document.getElementById('city-modal').style.display = 'none';
}




document.addEventListener('DOMContentLoaded', async () => {
  setTimeout(() => map.invalidateSize(), 100);

  // Initialise dropdown options and render initial map data
  await applyFilters();

  // Sidebar Controls
  document.getElementById('apply-filters-btn').addEventListener('click', applyFilters);
  document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);
  document.getElementById('close-city-modal-btn').addEventListener('click', closeCityModal);

  // Share Button
  document.getElementById('share-city-btn').addEventListener('click', async (e) => {
    const btn = e.target;
    const shareData = {
      title: `Tick Sightings in ${btn.dataset.city}`,
      text: `There have been ${btn.dataset.count} tick sightings reported in ${btn.dataset.city}.`,
      url: `https://www.google.com/maps/search/?api=1&query=${btn.dataset.lat},${btn.dataset.lng}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share cancelled:', err);
      }
    } else {
      const clipboardText = `${shareData.title}\n${shareData.text}\nLocation: ${shareData.url}`;
      await navigator.clipboard.writeText(clipboardText);
      alert('Sighting info copied to clipboard!');
    }
  });

  // Report Form Handling
  const reportModal = document.getElementById('report-modal');
  const reportBtn = document.getElementById('report-btn');
  const cancelReportBtn = document.getElementById('cancel-report-btn');
  const reportForm = document.getElementById('report-tick-form');

  reportBtn.addEventListener('click', () => {
    const locationSelect = document.getElementById('report-location');
    if (locationSelect) {
      // Sort cities alphabetically
      const cities = Object.keys(CITY_COORDINATES).sort();
      
      cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        locationSelect.appendChild(option);
      });
    }
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('report-date').value = now.toISOString().slice(0, 16);
    reportModal.style.display = 'flex';
  });

  cancelReportBtn.addEventListener('click', () => {
    reportModal.style.display = 'none';
    reportForm.reset();
  });

  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dateVal = document.getElementById('report-date').value;
    const locationVal = document.getElementById('report-location').value;
    const speciesSelect = document.getElementById('report-species');
    const speciesVal = speciesSelect.value;
    const latinNameVal = speciesSelect.options[speciesSelect.selectedIndex].getAttribute('data-latin');

    
    if (!dateVal || !speciesVal || !locationVal) {
      alert('Please fill in all required fields.', 'warning');
      return;
    }

    if (new Date(dateVal) > new Date()) {
      alert('Sighting date cannot be in the future.', 'warning');
      return;
    }

    const newReport = {
      date: dateVal,
      species: speciesVal,
      latinName: latinNameVal,
      location: locationVal
    };

    try {

      const res = await fetch(`${API_BASE_URL}/tick-sightings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      });

      if (!res.ok) throw new Error('Failed to submit report');

      alert('Sighting reported successfully!');

      setTimeout(() => {
        reportModal.style.display = 'none';
        reportForm.reset();
        applyFilters();
      }, 100);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error submitting report. Please try again.');
    }
  });
});



async function fetchCitySummaries() {
  const res = await fetch(`${API_BASE_URL}/city-summary`);
  if (!res.ok) throw new Error('Failed to fetch city summaries');
  return await res.json();
}



document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  document.getElementById('apply-filters-btn').addEventListener('click', applyFilters);
  document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);

});


document.getElementById('share-city-btn').addEventListener('click', async (e) => {
    const btn = e.target;
    
    const shareData = {
      title: `Tick Sightings in ${btn.dataset.city}`,
      text: `There have been ${btn.dataset.count} tick sightings reported in ${btn.dataset.city}.`,
      url: `https://www.google.com/maps/search/?api=1&query=${btn.dataset.lat},${btn.dataset.lng}`
    };

    // Use native device sharing if supported (mobile/modern browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share cancelled or failed:', err);
      }
    } else {
      // Fallback for desktop/unsupported browsers: Copy to clipboard
      const clipboardText = `${shareData.title}\n${shareData.text}\nLocation: ${shareData.url}`;
      navigator.clipboard.writeText(clipboardText).then(() => {
        alert('Sighting info copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  });