export function resetSelect(select, placeholder) {
    select.innerHTML = "";
    if (placeholder) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = placeholder;
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
    }
}

export function populateSelect(select, items, valueKey, textKey) {
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item[valueKey];
        option.textContent = item[textKey];
        select.appendChild(option);
    });
}

export function renderButton(div, items, valueKey, textKey){
    resetElement(div);
    items.forEach(item =>{
        const button = document.createElement("button");
        button.value = item[valueKey]
        button.textContent = item[textKey]
        div.appendChild(button)
    })
}

export function resetElement(element){
    element.innerHTML = "";
}

export function addDriverRow(tblBody, laps, driverNumber){
    const row = document.createElement("tr");
    row.id = driverNumber;
    const driverCell = document.createElement("td");
    const driverCellText = document.createTextNode(laps[0]["Driver"]);
    driverCell.appendChild(driverCellText);
    row.appendChild(driverCell);

    for (let index = 0; index < laps.length; index++) {
        const element = laps[index];
        const cell = document.createElement("td");
        const lapTimeText = document.createTextNode(element["LapTime"]);
        const compoundText = document.createTextNode("(" + element["Compound"][0] +")");
        cell.appendChild(lapTimeText);
        cell.appendChild(compoundText);
        row.appendChild(cell);
    }
    tblBody.appendChild(row);

}

export function removeDriverRow(driverNumber){
    const row = document.getElementById(driverNumber);
    if(row){
        row.remove();
    }
}