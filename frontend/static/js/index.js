import { fetchDrivers, fetchEvents, fetchSessions, fetchDriverLaps } from "./api.js";
import { resetSelect, populateSelect, renderButton, resetElement, addDriverRow, removeDriverRow} from "./dom.js";
import { createPlot, addTraceLapPlot, removeTraceLapPlot, resetPlot } from "./graph.js";

async function loadPlotly(){
    if(!window.Plotly){
        await import("https://cdn.plot.ly/plotly-3.1.0.min.js");
    } 
    return window.Plotly
}

document.addEventListener("DOMContentLoaded", async () => {
    const Plotly = await loadPlotly();
    createPlot();
    
    const yearSelect = document.getElementById("year-select");
    const eventSelect = document.getElementById("event-select");
    const sessionSelect = document.getElementById("session-select");
    const driverDiv = document.getElementById("driver-div");
    const tblBody = document.getElementById("laps-tbody");

    const activeDrivers = new Set();

    resetSelect(yearSelect, " Year ");
    resetSelect(eventSelect, " Event ");
    resetSelect(sessionSelect, " Session ");

    populateYears(yearSelect);

    yearSelect.addEventListener("change", async () => {
        resetSelect(eventSelect, " Event ");
        resetSelect(sessionSelect, " Session ");

        const events = await fetchEvents(yearSelect.value);
        populateSelect(eventSelect, events, "RoundNumber", "EventName");
        
        resetPlot();
    });

    eventSelect.addEventListener("change", async () => {
        resetSelect(sessionSelect, " Session ");
        const sessions = await fetchSessions(yearSelect.value, eventSelect.value);
        populateSelect(sessionSelect, sessions, "SessionIdentifier", "SessionName");

        resetPlot();
    });

    sessionSelect.addEventListener("change", async () =>{
        resetElement(driverDiv);
        resetElement(tblBody);

        activeDrivers.clear();
        const drivers = await fetchDrivers(yearSelect.value, eventSelect.value, sessionSelect.value);
        renderButton(driverDiv, drivers, "DriverNumber", "DriverName");

        resetPlot();
    });

     driverDiv.addEventListener("click", async (event) => {
        if( event.target.tagName !== "BUTTON" )
            return

        const driverNumber = event.target.value;
        if(activeDrivers.has(driverNumber)){
            removeDriverRow(driverNumber);
            activeDrivers.delete(driverNumber);
            removeTraceLapPlot(driverNumber);
        }else{
            const laps = await fetchDriverLaps(yearSelect.value, eventSelect.value, sessionSelect.value, driverNumber);
            addDriverRow(tblBody, laps, driverNumber);
            activeDrivers.add(driverNumber);
            addTraceLapPlot(laps, driverNumber);
        }
 
    }) 
});

function populateYears(select) {
    const currentYear = new Date().getFullYear();
    const minimumYear = 2018;
    for (let i = currentYear; i >= minimumYear; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}