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

const API_BASE_URL = 'https://dev-task.elancoapps.com/data'; 

document.addEventListener('DOMContentLoaded', async () => {
  let chartInstance = null;
  let allSightings = [];

  // API Helper to fetch data
  async function fetchAllSightings() {
    const res = await fetch(`${API_BASE_URL}/tick-sightings`);
    if (!res.ok) throw new Error('Failed to fetch sightings');
    return await res.json();
  }

  // Populate Dropdowns Dynamically from API Payload
  function populateDropdowns(sightings) {
    const citySelect = document.getElementById('chart-city');
    const yearSelect = document.getElementById('chart-year');

    citySelect.innerHTML = '<option value="all">All cities</option>';
    yearSelect.innerHTML = '<option value="all">All years</option>';

    const cities = Object.keys(CITY_COORDINATES).sort();

    const years = [...new Set(sightings.map(s => {
      const year = new Date(s.date).getFullYear();
      return isNaN(year) ? null : year;
    }).filter(Boolean))].sort((a, b) => b - a);

    cities.forEach(city => {
      const opt = document.createElement('option');
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });

    years.forEach(year => {
      const opt = document.createElement('option');
      opt.value = year.toString();
      opt.textContent = year.toString();
      yearSelect.appendChild(opt);
    });
  }

  // Aggregate Monthly Counts
  function getMonthlyCounts(cityFilter, yearFilter) {
    const counts = new Array(12).fill(0); // Index 0 = Jan, Index 11 = Dec

    allSightings.forEach(sighting => {
      if (!sighting.date) return;

      const dateObj = new Date(sighting.date);
      if (isNaN(dateObj.getTime())) return;

      const sightingYear = dateObj.getFullYear().toString();
      const sightingCity = sighting.location;

      const matchesCity = cityFilter === 'all' || sightingCity === cityFilter;
      const matchesYear = yearFilter === 'all' || sightingYear === yearFilter;

      if (matchesCity && matchesYear) {
        const monthIndex = dateObj.getMonth();
        counts[monthIndex] += 1;
      }
    });

    return counts;
  }

  // Render Chart.js Bar Chart
  function updateChart() {
    const selectedCity = document.getElementById('chart-city').value;
    const selectedYear = document.getElementById('chart-year').value;

    const dataPoints = getMonthlyCounts(selectedCity, selectedYear);
    const canvas = document.getElementById('seasonalChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const labelCity = selectedCity === 'all' ? 'all cities' : selectedCity;
    const labelYear = selectedYear === 'all' ? 'all years' : selectedYear;
    const labelText = `Sightings in ${labelCity}, ${labelYear}`;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: labelText,
          data: dataPoints,
          backgroundColor: '#f36d00',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 } // Keeps y-axis ticks as whole integers
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  // Initialize Page
  try {
    allSightings = await fetchAllSightings();
    populateDropdowns(allSightings);

    // Default the year selector to "all" so older data (like 2014) displays immediately
    document.getElementById('chart-year').value = 'all';

    updateChart();

    document.getElementById('chart-city').addEventListener('change', updateChart);
    document.getElementById('chart-year').addEventListener('change', updateChart);
  } catch (err) {
    console.error('Failed to initialize learn page chart:', err);
  }
});