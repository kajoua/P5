let panier = getPanier();
let priceTotal = totalPrice();
let panierConfirmation = getPanierConfirmation();

function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

function savePanier(panierConfirmation) {
    localStorage.setItem("commande", JSON.stringify(panierConfirmation));
}

function getPanierConfirmation() {
    let panierConfirmation = localStorage.getItem("commande");
    if (panierConfirmation == null) {
        return [];
    } else {
        return JSON.parse(panierConfirmation);
    }
}
const numberItemsPanier = panier.length;
for (let i = 0; i < numberItemsPanier; i++) {
    const htmlLignePanier = () => {
        let cartItemSection = document.getElementById("cart__items");
        let article = document.createElement("article");
        article.classList = "cart__item";
        article.dataset.id = panier[i]._id;
        article.dataset.color = panier[i].color;

        let cartItemImg = document.createElement("div");
        cartItemImg.classList = "cart__item__img";

        let image = document.createElement("img");
        image.src = panier[i].imageUrl;
        image.alt = panier[i].altTxt;

        let cartItemContent = document.createElement("div");
        cartItemContent.classList = "cart__item__content";

        let cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList = "cart__item__content__description";
        let nameDescription = document.createElement("h2");
        nameDescription.textContent = panier[i].name;
        let colorDescription = document.createElement("p");
        colorDescription.textContent = panier[i].color;
        let priceDescription = document.createElement("p");
        priceDescription.textContent = panier[i].price + "€";

        let cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList = "cart__item__content__settings";
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList =
            "cart__item__content__settings__quantity";
        let pQuantity = document.createElement("p");
        pQuantity.textContent = "Qté :";
        let inputQuantity = document.createElement("input");
        inputQuantity.type = "number";
        inputQuantity.classList = "itemQuantity";
        inputQuantity.name = "itemQuantity";
        inputQuantity.min = "1";
        inputQuantity.max = "100";
        inputQuantity.value = panier[i].quantity;
        inputQuantity.addEventListener("click", (e) => {
            e.preventDefault();
            let changeQuantity = e.target.value;

            panier = panier.filter(
                (e) =>
                (e.quantity =
                    changeQuantity ||
                    e.id != panier[i]._id ||
                    e.color != panier[i].color)
            );
            savePanier(panier);
            htmlTotalPrice.innerHTML = totalPrice();
            htmlTotalQuantity.innerHTML = totalQuantity();
        });

        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList =
            "cart__item__content__settings__delete";
        let pDelete = document.createElement("p");
        pDelete.classList = "deleteItem";
        pDelete.textContent = " Supprimer";
        pDelete.addEventListener("click", (e) => {
            e.preventDefault();
            panier = panier.filter(
                (c) => c._id != panier[i]._id || c.color != panier[i].color
            );
            article.remove();
            savePanier(panier);
            htmlTotalPrice.innerHTML = totalPrice();
            htmlTotalQuantity.innerHTML = totalQuantity();
        });

        cartItemSection.appendChild(article);
        article.appendChild(cartItemImg);
        cartItemImg.appendChild(image);
        article.appendChild(cartItemContent);
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.appendChild(nameDescription);
        cartItemContentDescription.appendChild(colorDescription);
        cartItemContentDescription.appendChild(priceDescription);
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettingsQuantity.appendChild(pQuantity);
        cartItemContentSettingsQuantity.appendChild(inputQuantity);
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        cartItemContentSettingsDelete.appendChild(pDelete);
    };
    htmlLignePanier();
}

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function totalQuantity() {
    let panier = getPanier();
    let number = 0;
    for (let q of panier) {
        number += parseInt(q.quantity);
    }
    return number;
}

let htmlTotalQuantity = document.getElementById("totalQuantity");
htmlTotalQuantity.innerHTML += totalQuantity();

function totalPrice() {
    let panier = getPanier();
    let price = 0;
    for (let p of panier) {
        price += parseInt(p.quantity) * parseInt(p.price);
    }
    return price;
}
let htmlTotalPrice = document.getElementById("totalPrice");
htmlTotalPrice.innerHTML += totalPrice();

// FORMULAIRE
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;
firstName.addEventListener("input", function(e) {
    valueFirstName;
    if (e.target.value.length == 0) {
        valueFirstName = null;
        firstNameErrorMsg.innerHTML = "";
    } else if (e.target.value.length < 2) {
        firstNameErrorMsg.innerHTML = `Le prénom est trop court`;
        valueFirstName = null;
    } else if (e.target.value.length > 25) {
        firstNameErrorMsg.innerHTML = `Le prénom est trop long `;
        valueFirstName = null;
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 25
    ) {
        firstNameErrorMsg.innerHTML = `Les caractères spéciaux et chiffres ne sont pas acceptés`;
        valueFirstName = null;
    }
});
lastName.addEventListener("input", function(e) {
    valueLastName;
    if (e.target.value.length == 0) {
        valueLastName = null;
        lastNameErrorMsg.innerHTML = "";
    } else if (e.target.value.length < 2) {
        lastNameErrorMsg.innerHTML = `Le nom est trop court`;
        valueLastName = null;
    } else if (e.target.value.length > 25) {
        lastNameErrorMsg.innerHTML = `Le nom est trop long `;
        valueLastName = null;
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
        lastNameErrorMsg.innerHTML = "";
        valueLastName = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 25
    ) {
        lastNameErrorMsg.innerHTML = `Les caractères spéciaux et chiffres ne sont pas acceptés`;
        valueLastName = null;
    }
});
address.addEventListener("input", function(e) {
    valueAddress;
    if (e.target.value.length == 0) {
        valueAddress = null;
        addressErrorMsg.innerHTML = "";
    } else if (e.target.value.length < 5) {
        addressErrorMsg.innerHTML = `L'adresse est trop courte`;
        valueAddress = null;
    } else if (e.target.value.length > 35) {
        addressErrorMsg.innerHTML = `L'adresse est trop longue `;
        valueAddress = null;
    }
    if (e.target.value.match(/^[a-z A-Z 0-9]{4,35}$/)) {
        addressErrorMsg.innerHTML = "";
        valueAddress = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z 0-9]{4,35}$/) &&
        e.target.value.length > 5 &&
        e.target.value.length < 35
    ) {
        addressErrorMsg.innerHTML = `Les caractères spéciaux ne sont pas acceptés`;

        valueAddress = null;
    }
});
city.addEventListener("input", function(e) {
    valueCity;
    if (e.target.value.length == 0) {
        valueCity = null;
        cityErrorMsg.innerHTML = "";
    } else if (e.target.value.length < 2) {
        cityErrorMsg.innerHTML = `Le nom de la ville est trop court`;
        valueCity = null;
    } else if (e.target.value.length > 25) {
        cityErrorMsg.innerHTML = `Le nom de la ville est trop long `;
        valueCity = null;
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
        cityErrorMsg.innerHTML = "";
        valueCity = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 25
    ) {
        cityErrorMsg.innerHTML = `Les caractères spéciaux et chiffres ne sont pas acceptés`;
        valueCity = null;
    }
});
email.addEventListener("input", function(e) {
    valueEmail;
    if (e.target.value.length == 0) {
        emailErrorMsg.innerHTML = "";
        valueEmail = null;
    } else if (
        e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
        emailErrorMsg.innerHTML = "";
        valueEmail = e.target.value;
    }
    if (!e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
        e.target.value.length == 0
    ) {
        emailErrorMsg.innerHTML = `Email incorrect ex: exemple@mail.fr`;
        valueEmail = null;
    }
});
////////////////////////////////////////////clickkkk form/////////////////////////////////////////////////
document
    .querySelector(".cart__order__form")
    .addEventListener("submit", function(e) {
        e.preventDefault();
        if (panier == 0) {
            panier;
            alert("Veuillez remplir votre panier");
        } else if (
            valueFirstName &&
            valueLastName &&
            valueAddress &&
            valueCity &&
            valueEmail
        ) {
            let panier = getPanier();
            let productId = [];
            panier.forEach((element) => {
                productId.push(element._id);
            });
            const contactProduct = {
                contact: {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("email").value,
                },
                products: productId,
            };
            const contactProducts = JSON.stringify(contactProduct);
            fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: contactProducts,
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => res.json())
                .then((secondReponse) => {
                    let reponsePromise = secondReponse;
                    const orderConfirmation = {
                        order: reponsePromise.orderId,
                    };
                    localStorage.removeItem("panier");
                    document.location.href =
                        "../html/confirmation.html?id=" + orderConfirmation.order;
                });
        } else {
            alert("Veuillez remplir le formulaire correctement");
        }
    });