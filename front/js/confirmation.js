//function to collect order id using URL Search params, returns unique order id
function collectOrderId() {
    let searchString = window.location.search;
    let urlParams = new URLSearchParams(searchString);
    let orderId = urlParams.get("orderid");
    return orderId;
}

const uniqueOrderId = collectOrderId();

console.log(uniqueOrderId);


//function to insert order id onto page, taking collected order id from search window as input
function displayOrderId (idNumber) {
    let orderIdContainer = document.getElementById("orderId");
    orderIdContainer.innerHTML = `${idNumber}`;
}

//function call for displaying order id
displayOrderId(uniqueOrderId);