// keys of servers
let keys = ["id", "location", "date", "power", "category", "services"];

// get data from server
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    // fetch request to server
    return fetch(url, fetchOptions).then(
        //ha megjött a válasz
        response => response.json(),
        err => console.error(err)
    );
}

// kattintassal
/* 
document.querySelector("#getDataBtn").addEventListener("click", function () {
    getServerData("http://localhost:3000/servers").then(
        //data => console.log(data)
        data => fillDataTable(data, "serversTable")
    );
})
*/

//onload
/*
window.onload = (event) => {
    startGetServers();
};
*/

//kattintassal
function startGetServers() {
    getServerData("http://localhost:3000/servers").then(
        data => fillDataTable(data, "serversTable")
    );
}

document.querySelector("#getDataBtn").addEventListener("click", startGetServers);

// fill  table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}"is not found`)
        return;
    }


    //let tBody = tableID.querySelectorAll("tbody"); //not a function


    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = newServerRow(); // data első eleme a kulcs miatt
    tBody.appendChild(newRow);
    for (let row of data) {
        // console.log(row);
        let tr = createAnyElement("tr");

        for (let k of keys) { //kulcs szerint
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

    for (let k in attributes) { // attrubútumokon végigmegyek
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

// button group
function createButtonGroup() {
    let group = createAnyElement("div", { class: "btn btn-group" });
    // let infoBtn = createAnyElement("button", { class: "btn btn-info" });
    let delBtn = createAnyElement("button", { class: "btn btn-danger", onclick: "delRow(this)" });
    delBtn.innerHTML = 'DEL';
    // group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    console.log(id);

    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(`http://localhost:3000/servers/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.log(err)
    ).then(
        data => {
            startGetServers();
        }
    );
}

// create new table row

function newServerRow() { // ??
    let tr = createAnyElement("tr");

    for (let k of keys) {
        let td = createAnyElement("td")
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }

    let newBtn = createAnyElement("button", {
        class: "btn btn-success",
        onclick: "createServer(this)"
    });
    newBtn.innerHTML = 'add';
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

// create new server

function createServer(btn) {
    let tr = btn.parentElement.parentElement;
    let data = getRowData(tr);
    console.log(data);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/servers`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => startGetServers() //console.log(data)
    );
}

function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};

    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }

    return data;
}