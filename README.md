# Tick Tracker

A full-stack geographic surveillance application designed to monitor, visualize, and analyze tick populations across the United Kingdom. This platform aggregates external data and user submissions to provide real-time severity alerts, seasonal trends, and public health education.

---

## About the Project

Tick-borne diseases are a growing public health concern. This project serves as a centralized hub to track tick distribution. It features an automated backend that continuously ingests external surveillance data, processes it against historical averages to determine regional threat levels, and serves it to a lightweight, highly interactive frontend map and analytics dashboard.

---

## Architecture & Technical Choices

This project was intentionally built without heavy frontend frameworks (like React or Vue) to demonstrate strong fundamentals in raw DOM manipulation, vanilla JavaScript, and lightweight architecture.

### Frontend
* **Vanilla JavaScript & HTML/CSS:** Ensures a minimal footprint, rapid load times, and avoids dependency bloat. 
* **Leaflet.js & Carto Tiles:** Selected for high-performance spatial rendering. Marker grouping handles dense data clusters without frame drops.
* **Chart.js:** Utilized on the analytics page for lightweight, responsive canvas-based data visualization (Seasonal Trends).
* **Build-Time Config Injection:** A custom Node.js build script (`scripts/build-config.js`) reads secure keys from the backend `.env` and statically generates a `config.js` file for the frontend.
* 
### Backend
* **Node.js & Express:** Provides a fast, non-blocking RESTful API to serve data to the frontend and handle form submissions.
* **PostgreSQL:** Chosen for its robust handling of structured relational data. 
* **Automated Data Sync Engine:** The backend runs a self-healing `setInterval` loop every 30 minutes, fetching external API data, filtering incomplete records, and using PostgreSQL's `ON CONFLICT DO NOTHING` to seamlessly merge new data with existing records.
* **Severity Scoring Algorithm:** Rather than static data serving, the `/city-summary` endpoint computes a dynamic risk score (Low, Medium, High) for every city by comparing rolling 30-day sighting counts against the city's historical monthly average.
* **Resilient Error Handling:** Implements robust try/catch workflows and HTTP status validation to gracefully manage external API outages or database connection issues without crashing the main Express server.
---

## Core Features

* **Interactive Severity Map:** City markers dynamically scale and color-code based on the algorithmic threat level. Clicking a marker reveals a chronological sighting history.
* **Real-time Filtering:** Instantly filter geospatial data by specific species (using exact Latin nomenclature mapping) and date ranges.
* **Sighting Submissions:** A robust reporting form with client-side validation that maps common names to scientific binomials before sending data to the backend.
* **Share & Route Integration:** Built-in Web Share API integration and deep-linking to Google Maps directions for specific sighting hotspots.
* **Educational Hub:** Species identification guides, prevention protocols, and dynamically generated seasonal activity bar charts.

---

## Setup & Installation Instructions

### 1. Prerequisites
You will need the following installed on your machine:
* **Node.js** (v18 or higher)
* **PostgreSQL** (v14 or higher)

### 2. Database Setup
Before running the server, you must create the database in PostgreSQL.
1. Open your PostgreSQL command line (`psql`) or pgAdmin.
2. Create a new database named `ticktracker`:
   ```sql
   CREATE DATABASE ticktracker;
   ```
*(Note: You do not need to create the tables manually; the application will automatically populate them upon the first successful API sync).*

### 3. Clone & Install
Clone the repository and install the backend dependencies:
```bash
git clone https://github.com/Jabro-99/tick-tracker.git
cd tick-tracker
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root of the project. Replace the database credentials with your local PostgreSQL setup:
```env
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ticktracker
DB_PASSWORD=your_postgres_password_here
DB_PORT=5432
```
Within the `/js` folder, create a file named `config.js` and add your Carto API key (freely accessible from https://carto.com/basemaps/apikey/).

```config.js
CARTO_API_KEY="your_carto_api_key_here";

```

### 5. Run the Application
Start the Node.js backend server:
```bash
node server.js
```
When the server starts, you will see it connect to PostgreSQL and successfully sync the external API data. 

To view the application, open `html/home.html` in your web browser (or use a local development server like VS Code's "Live Server" extension).

---

## API Reference

The Express backend exposes the following REST endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/tick-sightings` | Returns a chronological array of all verified sightings. |
| `GET` | `/tick-sightings/species/:species` | Returns sightings filtered by exact species match. |
| `GET` | `/tick-sightings/city/:city` | Returns sightings localized to a specific UK city. |
| `POST` | `/tick-sightings` | Validates and inserts a new user-reported sighting into the local database. |
| `GET` | `/city-summary` | Returns dynamic severity categorizations for all active cities. |
