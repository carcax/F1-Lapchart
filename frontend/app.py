from flask import Flask, request, render_template, jsonify
from core import TelemetryService
app = Flask(__name__)

@app.route("/")
def index():  
    return render_template('index.html')

@app.route("/api/events", methods = ['POST'])
def events():
    if not (request.method == 'POST'):
        return 
    
    data = request.get_json()
    year = data.get("year")
    try:
        year = int(year)

        service = TelemetryService(year)
        return jsonify(service.get_available_events())
    
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid year"}), 400

@app.route("/api/sessions", methods=['POST'])
def sessions():
    if not( request.method == 'POST'):
        return 
    
    data = request.get_json()

    roundNumber = data.get('RoundNumber')
    year = data.get('year')
    try:
        year = int(year)
        roundNumber = int(roundNumber)

        service = TelemetryService(year)
        return jsonify(service.get_sessions(roundNumber))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid year or round number"}), 400
    
@app.route("/api/drivers", methods = ['POST'])
def drivers():
    if not( request.method == 'POST'):
        return 
    
    data = request.get_json()
    roundNumber = data.get('RoundNumber')
    year = data.get('year')
    sessionIdentifier = data.get('SessionIdentifier')
    
    try:
        year = int(year)
        roundNumber = int(roundNumber)
        sessionIdentifier = int(sessionIdentifier)

        service = TelemetryService(year)
        return jsonify(service.get_drivers(roundNumber, sessionIdentifier))
    except(TypeError, ValueError):
        return jsonify({"error": "Invalid year, round number or session identifier"}), 400
    
@app.route("/api/driver/laps", methods = ['POST'])
def driver_laps():
    if not( request.method == 'POST'):
        return
     
    data = request.get_json()

    round_number = data.get('RoundNumber')
    year = data.get('year')
    session_identifier = data.get('SessionIdentifier')
    driver_number = data.get('DriverNumber')
    try:
        year = int(year)
        round_number = int(round_number)
        session_identifier = int(session_identifier)
        driver_number = int(driver_number)

        service = TelemetryService(year)
        return jsonify(service.get_driver_laps(round_number, session_identifier, driver_number))
    
    except(TypeError, ValueError):
        return jsonify({"error": "Invalid year, round number or session identifier"}), 400