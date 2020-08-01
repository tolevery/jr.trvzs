function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("input[name='amount-input']");
    // alert("Fizetendo: " + amount + " Ft")

    let amountNumber = parseInt(amountInput.value);
    if (isNaN(amountNumber)) {
        amountNumber = 0;
    }

    showSumPrice(price, amountNumber)
}

function showSumPrice(price, amountNumber){
    let showAmount = document.querySelector("span.show-amount");
    if (amountNumber > 10) {
        alert("kérlek ne legyyél paraszt")
    } else if (amountNumber < 1) {
        alert("vegyél már valamit")
    } else {
        let amount = amountNumber * price;
        showAmount.innerHTML = amount;
    }
}

let name1 = "Sanyi";
var name2 = "Sanyi2";
{
    let name1 = "Pisti";
    var name2 = "Pisti2";
    console.log(name1);
    console.log(name2);
}

console.log(name1);
console.log(name2);
