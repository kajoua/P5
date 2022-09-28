let confirmation = getConfirmation();
let orderIdd = confirmation.order;

function getConfirmation() {
    let informations = localStorage.getItem("Information");
    if (informations == null) {
        return [];
    } else {
        return JSON.parse(informations);
    }
}

const buildConfirmation = () => {
    let htmlOrderId = document.getElementById("orderId");
    htmlOrderId.innerHTML = orderIdd;
};
buildConfirmation();
localStorage.removeItem("Information");