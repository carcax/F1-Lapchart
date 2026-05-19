import fastf1
from datetime import datetime
import pandas as pd

class TelemetryService:
    def __init__(self, year):
        if  year < 2018:
            raise ValueError("Year must be 2018 or later")

        self.year = year
        self.schedule = fastf1.get_event_schedule(year, include_testing=False)


    def get_available_events(self):
        """
        Returns events from the start of the season up to today.

        Each event is a dict with:
            - round_number (int)
            - EventName (str)
        """

        today = datetime.now().date()
        mask = self.schedule['EventDate'].apply(lambda d: d.date() <= today)
        events_data = self.schedule[mask]
        events = []
        for _,row in events_data.iterrows():
            events.append(
                {
                    "RoundNumber" : int(row['RoundNumber']),
                    "EventName" : row['EventName']
                }
            )

        return events
    
    def get_sessions(self, round_number):
        """
        Returns sessions for a give event round.

        Each session is a dict with:
            - session_identifier (int): The index of the session(1-5)
            - SessionName (str)
        """
        event = self.schedule.get_event_by_round(round_number)
        sessions = []
        for i in range(1,6):
            session_name = event.get_session_name(i)
            if session_name:
                sessions.append({
                    "SessionIdentifier" : i,
                    "SessionName" : session_name
                })
        
        return sessions
    
    def get_drivers(self, round_number, session_identifier):
        """
        Returns all drivers participating in a specific session.

        Each driver is a dict with:
            - DriverNumber (str): The driver's unique number
            - DriverName (str): The driver's abbreviation (e.g., "HAM" for Hamilton)
        """
        session = fastf1.get_session(self.year, round_number, session_identifier)
        session.load()
        drivers = []
        for driver in session.drivers:
            drivers.append({
                "DriverNumber" : driver,
                "DriverName" : session.get_driver(driver)['Abbreviation']
            })
        
        return drivers

    def format_lap_time(self, LapTime, string=True):
        """
        Converts a lap time to either total seconds or a formatted string.

        Parameters:
            - LapTime: pandas Timedelta, float, or None.
            - string: bool. If True, returns a formatted string "M:SS.mmm"; 
                    if False, returns total seconds as a float.

        Returns:
            - float: total seconds (if string=False)
            - str: formatted time "M:SS.mmm" (if string=True)
            - "N/A" if LapTime is None or NaN
        """

        if LapTime is None or pd.isna(LapTime):
            return None if not string else "N/A"
        
        total_seconds = LapTime.total_seconds() if hasattr(LapTime, 'total_seconds') else float(LapTime)

        if not string:
            return total_seconds  
        else:
            minutes = int(total_seconds // 60)
            seconds = int(total_seconds % 60)
            milliseconds = int((total_seconds - int(total_seconds)) * 1000)
            return f"{minutes}:{seconds:02}.{milliseconds:03}"

    def get_driver_laps(self, round_number, session_identifier, driver_number):
        """
        Returns all laps for a specific driver in a given session.

        Each lap is a dictionary with:
            - LapNumber (int): The lap index
            - Driver (str): Driver code/abbreviation
            - LapTime (str): Lap time formatted as "M:SS.mmm", or "N/A" if not available
            - LapTimeTotalSecond (float): Lap time in seconds, or None if not available
            - Compound (str): Tyre compound used for the lap
            - TyreLife (int): Number of laps on the current tyre set
        """
        session = fastf1.get_session(self.year, round_number, session_identifier)
        session.load()
        laps = []
        for _,lap in session.laps.pick_drivers(driver_number).iterrows():
            laps.append({
                "LapNumber" : int(lap["LapNumber"]),
                "Driver" : lap["Driver"],
                "LapTime" : self.format_lap_time(lap["LapTime"], string=True),
                "LapTimeTotalSecond" : self.format_lap_time(lap["LapTime"], string=False),
                "Compound" : lap["Compound"],
                "TyreLife" : lap["TyreLife"]
            })
        return laps
    