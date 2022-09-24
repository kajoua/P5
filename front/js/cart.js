let panier = getPanier();

function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
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

        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList =
            "cart__item__content__settings__delete";
        let pDelete = document.createElement("p");
        pDelete.classList = "deleteItem";
        pDelete.textContent = " Supprimer";

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

    let cartItems = document.getElementsByTagName("article");
    let cartLastChild = cartItems[cartItems.length - 1];
    cartLastChild.querySelector(".deleteItem").addEventListener("click", (e) => {
        e.preventDefault();
        panier = panier.filter(
            (c) => c._id != panier[i]._id || c.color != panier[i].color
        );
        savePanier(panier);
    });

    let newQuantity = cartLastChild
        .querySelector(".itemQuantity")
        .addEventListener("click", (e) => {
            e.preventDefault();
            let changeQuantity = e.target.value;
            console.log(changeQuantity);
            panier = panier.filter(
                (e) =>
                (e.quantity =
                    changeQuantity ||
                    e.id != panier[i]._id ||
                    e.color != panier[i].color)
            );

            savePanier(panier);
        });
    newQuantity;
}

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function totalQuantity() {
    let panier = getPanier();
    let number = 0;
    for (let q of panier) {
        number += q.quantity;
    }
    return number;
}

let htmlTotalQuantity = document.getElementById("totalQuantity");
htmlTotalQuantity.innerHTML += totalQuantity();

function totalPrice() {
    let panier = getPanier();
    let price = 0;
    for (let p of panier) {
        price += p.quantity * p.price;
    }
    return price;
}
let htmlTotalPrice = document.getElementById("totalPrice");
htmlTotalPrice.innerHTML += totalPrice();

// FORMULAIRE

document
    .querySelector(".cart__order__form")
    .addEventListener("submit", function(e) {
        e.preventDefault();
        if (panier == 0) {
            panier;
            alert("Veuillez remplir votre panier");
        } else {
            let panier = getPanier();
            let productId = [];
            panier.forEach((element) => {
                productId.push(element._id);
            });
            const contactProducts = {
                contact: {
                    fistName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("email").value,
                },
                products: productId,
            };

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactProducts),
            });
            // document.location.href = "../html/confirmation.html";
        }
    });