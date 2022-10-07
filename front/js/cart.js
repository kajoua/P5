///Récupération de la fonction getPanier pour traiter les données, doit pouvoir avoir un tableau vide si push
let panier = getPanier();
let priceTotal = totalPrice();

function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
} // savePanier à nouveau pour enregistrer dans le local storage avec sérialisation en chaine de caractère sinon objet
function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}
///création de fonction pour le total Quantity
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
// Création de fonction pour le prix total
function totalPrice() {
    //Récupération du panier en JSON.parse
    let panier = getPanier();
    //Variable prix qui correspond à 0
    let price = 0;
    //Création d'une boucle dans Panier
    for (let p of panier) {
        //  0 += quantité dans panier * prix dans panier (parseInt pour pouvoir être calculé)
        price += parseInt(p.quantity) * parseInt(p.price);
    }
    ///retourne le prix total
    return price;
}
// Intégration du prix total avec le InnerHMTL dans le totalPrice avec le getElementById
let htmlTotalPrice = document.getElementById("totalPrice");
htmlTotalPrice.innerHTML += totalPrice();
/// Création d'une constance pour retourner la longueur du panier
const numberItemsPanier = panier.length;
/// Boucle for pour que l'élement i soit répéter autant de fois qu'il y a de produit dans le panier i+1
for (let i = 0; i < numberItemsPanier; i++) {
    const htmlLignePanier = () => {
        //// Récupération du html avec le getElementById
        let cartItemSection = document.getElementById("cart__items");
        ///Création de l'article avec le createElement
        let article = document.createElement("article");
        /// Rajout de attributs
        article.classList = "cart__item";
        ///Attribut data pour personnaliser les données
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
        //Add eventListener au clic de quantity
        inputQuantity.addEventListener("click", (e) => {
            ///Blocage du comportement par défaut du clic
            e.preventDefault();
            //Création d'une variable pour trouver, find(), l'element qui correspond à l'ID du panier et la couleur du panier
            let panierItem = panier.find(
                (e) => e._id == panier[i]._id && e.color == panier[i].color
            );
            //Association de la e.target.value à panierItem.quantity
            panierItem.quantity = e.target.value;
            // Enregistrement de la nouvelle donnée dans le localStorage
            savePanier(panier);
            //Puis modification des totaux dans le DOM grâce aux innerHTML en récupérant les fontions
            htmlTotalPrice.innerHTML = totalPrice();
            htmlTotalQuantity.innerHTML = totalQuantity();
        });

        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList =
            "cart__item__content__settings__delete";
        let pDelete = document.createElement("p");
        pDelete.classList = "deleteItem";
        pDelete.textContent = " Supprimer";
        //Add eventListener au clic de Supprimer
        pDelete.addEventListener("click", (e) => {
            ///Blocage du comportement par défaut du clic
            e.preventDefault();
            //Création d'une variable pour filtrer, filter(), l'element qui correspond pas à l'ID du panier et la couleur du panier
            panier = panier.filter(
                (c) => c._id != panier[i]._id || c.color != panier[i].color
            );
            // Suppression de l'article dans le local storage
            article.remove();
            // Enregistrement de la nouvelle donnée dans le localStorage
            savePanier(panier);
            //Puis modification des totaux dans le DOM grâce aux innerHTML en récupérant les fontions
            htmlTotalPrice.innerHTML = totalPrice();
            htmlTotalQuantity.innerHTML = totalQuantity();
        });
        /// AppendChild pour créer / emboiter correctement les balises
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
    // Appel de la fonction
    htmlLignePanier();
}

///////////////////// FORMULAIRE////////////////////////////////////////////////////
////Const pour appeler tout les inputs du formulaire avec getElementById///
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
///Const pour appeler tout les messages d'erreurs du formulaire avec getElementById////
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
////déclaration de variable sans valeurs, des valeurs avenir qui seront remplis par le client///
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

////addEventListener sur INPUT de first name////
firstName.addEventListener("input", function(e) {
    // on appelle la variable
    valueFirstName;
    ////value.lenght pour la condition de la longueur du mot
    //// utilisation de InnerHTML pour faire apparaitre la condition si celle ci n'est pas respecté
    if (e.target.value.length == 0) {
        /// value = null =>éviter qu'elle soit envoyé dans le local storage si conditon pas respecté
        valueFirstName = null;
        firstNameErrorMsg.innerHTML = "";
    } else if (e.target.value.length < 2) {
        firstNameErrorMsg.innerHTML = `Le prénom est trop court`;
        valueFirstName = null;
    } else if (e.target.value.length > 25) {
        firstNameErrorMsg.innerHTML = `Le prénom est trop long `;
        valueFirstName = null;
    }
    ///value.match si ca concorde avec le Regex énoncé
    ///REGEX A à Z , a à z , d'une longueur de 2 à 25
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
//Récupération du formulaire & addEventListener au submit
document
    .querySelector(".cart__order__form")
    .addEventListener("submit", function(e) {
        ///Blocage du comportement par défaut du submit
        e.preventDefault();
        ///Condition si le panier est vide, une alerte est crée pour remplir le panier
        if (panier == 0) {
            panier;
            alert("Veuillez remplir votre panier");
        }
        ////// Si les values sont trues alors :
        else if (
            valueFirstName &&
            valueLastName &&
            valueAddress &&
            valueCity &&
            valueEmail
        ) {
            ////on récupère la variable getPanier pour pouvoir travailler sur les elements du panier
            let panier = getPanier();
            /// variable vide pour pouvoir y insérer les ID
            let productId = [];
            /// On récupèration des ID sélectionner avec forEach, méthode push() pour ajouter les valeurs au tableau
            panier.forEach((element) => {
                productId.push(element._id);
            });
            ///Création d'une constante où on y intègre les values du formulaires
            ///et le products comme stipuler dans ../back/controllers/product.js
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
            ///Sérialisation de l'ensemble pour que ce soit lue par l'API
            const contactProducts = JSON.stringify(contactProduct);
            /// Création d'une requête POST pour obtenir le orderId de contactProducts
            fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: contactProducts,
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => res.json())
                .then((secondReponse) => {
                    //Récupération de la réponse dans reponsePromise
                    let reponsePromise = secondReponse;
                    ///Récupération de l'orderId uniquement
                    const orderConfirmation = {
                        order: reponsePromise.orderId,
                    };
                    ///suppression de l'intégralité du panier dans le localStorage avec removeItem
                    localStorage.removeItem("panier");
                    ///Rerige vers de la page de confirmation auxquel nous rajoutons avec le innerHTML le orderId
                    document.location.href =
                        "../html/confirmation.html?id=" + orderConfirmation.order;
                });
            ///Condition si le formulaire n'est pas rempli correction, envoi un message d'alerte
        } else {
            alert("Veuillez remplir le formulaire correctement");
        }
    });