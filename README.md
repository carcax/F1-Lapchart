# F1 Telemetry Web App 

A lightweight web application built to explore, analyze, and visualize Formula 1 telemetry data. The primary goal of this project was to practice **API design**, asynchronous JavaScript, and backend-frontend integration using a real-world, complex dataset.

The application allows users to select a specific F1 season, event, and session to compare drivers' lap times dynamically through interactive charts.

## Features
- **Dynamic Data Fetching:** Automatically filters and retrieves historical F1 data from 2018 up to the current season's completed events.
- **Interactive Multi-Driver Comparison:** Compare multiple drivers simultaneously; adding or removing a driver updates both the telemetry table and the chart in real time.
- **Data Visualization:** Plots complete session lap times using `Plotly.js` for clear trend analysis (including tire compound tracking).

## Architecture & Tech Stack

- **Backend:**
  - **Python & Flask:** RESTful API handling requests, parameter validation, and data serving.
  - **FastF1 Library:** Used to extract official Formula 1 timing and telemetry data.
- **Frontend:**
  - **JavaScript:** Written completely from scratch without heavy frameworks, split into logical modules (`api.js`, `dom.js`, `graph.js`) to maximize maintainability.
  - **Plotly.js:** For rendering fast, responsive charts.
  - **HTML5 & CSS.**

## Key Learnings & Project Goals

This project was built from scratch to practice core software development concepts without relying on external frameworks:

- **Code Organization:** Separated the backend logic (`TelemetryService.py`) from the frontend modules, splitting JavaScript into simple files for API requests, DOM updates, and charts.
- **Asynchronous JS:** Used native `async/await` and `fetch()` to update the UI dynamically without reloading the page.
- **Basic API Handling:** Structured simple Flask POST routes with basic `try-except` blocks to handle and validate user inputs.
- **Data Management:** Used standard JavaScript `Map` and `Set` to keep track of selected drivers and active chart lines.

## Project Structure

```text
F1-Telemetry/
├── core/
│   ├── TelemetryService.py
│   └── __init__.py
├── frontend/
│   ├── app.py
│   ├── templates/
│   │   └── index.html
│   └── static/js/
│       ├── config.js
│       ├── api.js
│       ├── dom.js
│       ├── graph.js
│       └── index.js
├── requirements.txt
└── .gitignore

```
## Installation & Setup

Make sure you have Python 3.8+ installed on your sistem.

### 1. Clone the repository

git clone https://github.com/carcax/F1-Lapchart
cd F1-Telemetry

### 2. Set up a Virtual Environment (Recommended)

python -m venv venv
#### On Windows:
venv\Scripts\activate
#### On macOS/Linux:
source venv/bin/activate

### Install Dependecies
pip install -r requirements.txt

### Run the Application
python frontend/app.py

Open your browser and navigate to http://127.0.0.1