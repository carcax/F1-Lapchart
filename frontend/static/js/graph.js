let data = new Map([]);
let position = 0;

export function createPlot(){
    const div = document.getElementById("lap-graph");
    
    let layout = {
        title: {Text: "LapTime"},
        xaxis: {text: "Lap"},
        yaxis: {text: "Time"},
        showLegend: true
    };
    
    Plotly.newPlot(div, [], layout, {displayModeBar: false, displaylogo: false});
}

export function resetPlot(){
    const div = document.getElementById("lap-graph");

    if(!div)
        return;
    
    createPlot();
    data.clear();
    position = 0;
}

export function addTraceLapPlot(laps, driverNumber){
    if(data.has(driverNumber))
        return;

    const div = document.getElementById("lap-graph");

    let x = [];
    let y = [];
    let hoverTemplate = [];

    for (let i = 0; i < laps.length; i++){
        const element = laps[i];
        if(element["LapTime"] != "N/A"){
            x[i] = element["LapNumber"];
            y[i] = element["LapTimeTotalSecond"];
            hoverTemplate[i] = element["LapTime"] + " (" + element["Compound"][0] + ") ";
        
        }
            
    }
    
    let trace = {
        x: x,
        y: y,
        mode: 'lines+markers',
        name: laps[0]["Driver"],
        hovertemplate: hoverTemplate
    };

    data.set(driverNumber, position);
    position++;
    Plotly.addTraces(div, trace);
}

export function removeTraceLapPlot(driverNumber){
    if(!data.has(driverNumber))
        return;

    const div = document.getElementById("lap-graph");

    let pos = data.get(driverNumber);

    data.delete(driverNumber);
    position--;
    Plotly.deleteTraces(div, pos);
}