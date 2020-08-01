// get data from server
function getServerData(url) {
    let fetchOptions = {
        mrthod: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    // fetch request to server
    return fetch(url,fetchOptions).then(
        //ha megjött a válasz
        response => response.json(),
        err => console.error(err)
    );
}

// kattintassal
document.querySelector("#getDataBtn").addEventListener("click", function(){
    getServerData("http://localhost:3000/servers").then(
        //data => console.log(data)
        data => fillDataTable(data, "serversTable")
    );
})

// fill  table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if(!table){
        //console.error(`Table "${tableID}"is not found`)
        return;
    }

    //let tBody = tableID.querySelectorAll("tbody"); //not a function
    let tBody = table.querySelector("tbody");

    for(let row of data) {
        // console.log(row);
        let tr = createAnyElement("tr");

        for (let k in row) { //kulcs szerint
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        let btnGroup = createButtonGroup();
        tr.appendChild(btnGroup)
        tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes) { 
    let element = document.createElement(name); //elem létrehozása
    
    for (let k in attributes){ // attrubútumokon végigmegyek
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

// button group
function createButtonGroup() {
    //befogadó div
    let group = createAnyElement("div", {class: "btn btn-group"});
    let infoBtn = createAnyElement("button", {class: "btn btn-info"});
    let delBtn = createAnyElement("button", {class: "btn btn-danger"});

    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    // cella létrehozása
    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}