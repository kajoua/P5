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
    let htmlPanier = `<article class="cart__item" data-id="${panier[i]._id}" data-color="{${panier[i].color}">
    <div class="cart__item__img">
      <img src="${panier[i].imageUrl}" alt="${panier[i].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${panier[i].name}</h2>
        <p>${panier[i].color}</p>
        <p>${panier[i].price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

    document.getElementById("cart__items").innerHTML += htmlPanier;
}

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

// const itemQuantity = panier.length;

// for (let q = 0; q < itemQuantity; q++) {
//     const totalQuantity = numberItemsPanier * panier[q].quantity;

//     htmlQuantity.innerHTML = totalQuantity;
// }

// const itemPrice = 1;
// for (let q = 0; q < itemPrice; q++) {
//     const totalPrice = numberItemsPanier * panier[q].price;
//     let htmlPrice = document.getElementById("totalPrice");
//     htmlPrice.innerHTML = totalPrice;
// }

// let htmlDelete = document.getElementById("deleteItem");

// element.colors.forEach((color) => {
//     let optionColors = document.createElement("option");
//     optionColors.innerHTML = `${color}`;

//     htmlSelect.appendChild(optionColors);
// });
// htmlDelete;
// //deleteItem.addEventListener("click", buttonSupprimer);

// // function buttonSupprimer() {
// //     let buttonDelete = document.createElement("button");
// //     buttonDelete.appendChild.(".deleteItem");
// //     window.localStorage.removeFromPanier("product");
// // }
// // buttonSupprimer();

function removeFromPanier(product) {
    let panier = getPanier();
    panier = panier.filter((p) => p.id != product.id);
    savePanier(panier);
}

function changeQuantity(product, quantity) {
    let panier = getPanier();
    panier = panier.filter((p) => p.id != product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity >= 0) {
            removeFromPanier(foundProduct);
        } else {
            savePanier(panier);
        }
    }
}

// FORMULAIRE

document
    .querySelector(".cart__order__form")
    .addEventListener("submit", function(e) {
        e.preventDefault();
        let panier = getPanier();
        if (panier == null) {
            alert("Veuillez choisir des produits");
        } else {
            const customer = {
                fistName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            };
            console.log(document.getElementById("email").value);
            const customerPush = localStorage.setItem(
                "customer",
                JSON.stringify(customer)
            );
            customerPush;
            alert("Formulaire envoyé");
            document.location.href = "../html/confirmation.html";
        }
    });