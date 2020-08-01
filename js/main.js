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
window.onload = (event) => {
    startGetUsers();
};

//kattintassal
function startGetUsers(){
    getServerData("http://localhost:3000/servers").then(
        data => fillDataTable(data, "serversTable")
    );
}

document.querySelector("#getDataBtn").addEventListener("click", startGetUsers);

// fill  table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        //console.error(`Table "${tableID}"is not found`)
        return;
    }

    //let tBody = tableID.querySelectorAll("tbody"); //not a function
    let tBody = table.querySelector("tbody");

    for (let row of data) {
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

    for (let k in attributes) { // attrubútumokon végigmegyek
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

// button group
function createButtonGroup() {
    //befogadó div
    let group = createAnyElement("div", { class: "btn btn-group" });
    let infoBtn = createAnyElement("button", { class: "btn btn-info" });
    infoBtn.innerHTML = 'edit';
    let delBtn = createAnyElement("button", { class: "btn btn-danger", onclick: "delRow(this)" });
    delBtn.innerHTML = 'delete';

    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    // cella létrehozása
    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

//delete
function setBtnEvent(){

}

//del2
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
            startGetUsers();
        }
    );
}