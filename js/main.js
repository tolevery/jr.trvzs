// Keys of servers
let keys = ["id", "location", "date", "power", "category", "services"];

// Onload
window.onload = (event) => {
    startGetServers();
};

// Get data from server
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

// Get servers info
function startGetServers() {
    getServerData("http://localhost:3000/servers").then(
        data => fillDataTable(data, "serversTable")
    );
}

document.querySelector("#getDataBtn").addEventListener("click", startGetServers);

// Fill  table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}"is not found`)
        return;
    }

    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = newServerRow();
    tBody.appendChild(newRow);

    for (let row of data) {
        let tr = createAnyElement("tr");

        for (let k of keys) { //kulcs szerint
            let td = createAnyElement("td");
            let input = createAnyElement("input", {
                class: "form-control",
                value: row[k],
                name: k
            });

            if (k == "id") {
                input.setAttribute("readonly", true);
            }
            td.appendChild(input);
            tr.appendChild(td);
        }
        let btnGroup = createButtonGroup();
        tr.appendChild(btnGroup)
        tBody.appendChild(tr);
    }
}

// add element
function createAnyElement(name, attributes) {
    let element = document.createElement(name);

    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }

    return element;
}

// Button group (delete, update)
function createButtonGroup() {
    let group = createAnyElement("div", { class: "btn btn-group" });

    let infoBtn = createAnyElement("button", { class: "btn btn-info", onclick: "setRow(this)" });
    infoBtn.innerHTML = 'Frissítés';

    let delBtn = createAnyElement("button", { class: "btn btn-danger", onclick: "delRow(this)" });
    delBtn.innerHTML = 'Törlés';

    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

// Delete row
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

// Get table row
function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};

    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }

    return data;
}

// Create new table row
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
    newBtn.innerHTML = 'Hozzáadás';
    let td = createAnyElement("td");

    td.appendChild(newBtn);
    tr.appendChild(td);

    return tr;
}

// PUT row
function setRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr);
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/servers/${data.id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => startGetServers()
    );
}