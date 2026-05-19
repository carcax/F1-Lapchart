import { API_BASE_URL } from "./config.js";

export async function fetchEvents(year) {
    const res = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year }),
    });
    return await res.json();
}

export async function fetchSessions(year, RoundNumber) {
    const res = await fetch(`${API_BASE_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, RoundNumber}),
    });
    return await res.json();
}

export async function fetchDrivers(year, RoundNumber, SessionIdentifier) {
    const res = await fetch(`${API_BASE_URL}/drivers`, {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({ year, RoundNumber, SessionIdentifier})
    });

    return await res.json();
}

export async function fetchDriverLaps(year, RoundNumber, SessionIdentifier, DriverNumber){
    const res = await fetch(`${API_BASE_URL}/driver/laps`, {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({year, RoundNumber, SessionIdentifier, DriverNumber}) 
    })
    return await res.json();
}