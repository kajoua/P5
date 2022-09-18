let customerElement = getCustomer();

function getCustomer() {
    let customer = localStorage.getItem("customer");
    if (customer == null) {
        return [];
    } else {
        return JSON.parse(customer);
    }
}

let hmtlForm = ``;