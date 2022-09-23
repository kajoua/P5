let contactElement = getCustomer();

function getCcontact() {
    let contact = localStorage.getItem("contact");
    if (contact == null) {
        return [];
    } else {
        return JSON.parse(contact);
    }
}

let hmtlForm = ``;