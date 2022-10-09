// Creation d'une fonction avec ID et color
function findQuantityInPanier(product_id, color) {
    // récupération du panier pour pouvoir bosser dessus
    let panier = getPanier();
    // Trouver le produit correspondant à l'ID et à la couleur
    let foundProduct = panier.find(
        (p) => p._id == product_id && p.color == color
    );
    let quantity = 0;
    if (foundProduct != undefined) {
        quantity = parseInt(foundProduct.quantity);
    }
    return quantity;
}

// Récupéreration l'id de la page de l'URL
const idUrl = window.location.search;
// Créer une variable pour récupérer seulement le ID sans ?=
////// .split() pour séparer
let words = idUrl.split("=");
///Création variable product pour pouvoir l'intégrer dans le addPanier
let product = {};
let panier = getPanier();
let maximum = 100;
let minimum = 1;
// Récupérer les données de l'api - Associer l 'ID  de la page avec l'id correspondant de l 'API
fetch(`http://localhost:3000/api/products/${words[1]}`)
    .then((response) => response.json())
    .then((produit) => {
        product = produit;
        buildHtml(produit);
    });
////Construction du HTML- avec QuerySelector ou getElementBy... & InnerHTML ////////////////
const buildHtml = (element) => {
    let html = `<img src="${element.imageUrl}" alt="${element.altTxt}"></img>`;

    let htmlImage = document.getElementsByClassName("item__img")[0];

    htmlImage.innerHTML += html;

    let htmlTitle = document.getElementById("title");
    htmlTitle.innerHTML = element.name;

    let htmlPrice = document.getElementById("price");
    htmlPrice.innerHTML = element.price;

    let htmlDescription = document.getElementById("description");
    htmlDescription.innerHTML = element.description;

    let htmlSelect = document.getElementById("colors");
    /////// forEach = color , pour exécuter la fonction sur chaque element /////
    element.colors.forEach((color) => {
        let optionColors = document.createElement("option");
        optionColors.innerHTML = `${color}`;

        htmlSelect.appendChild(optionColors);
    });
};

//// Associer le bouton valider au panier en envoyant les informations dans le panier

let buttonPanier = document.getElementById("addToCart");
//Fonction setItem pour l'envoyer dans le localStorage + sérialisation sinon objet
function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}
// Fonction pour pouvoir traiter les données, doit pouvoir avoir un tableau vide si push
function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        ///Parse pour modif la chaîne de caractère en objet ou tableau ou autres
        return JSON.parse(panier);
    }
}
////Fonction ajouter dans mon local storage
function addPanier(product, color, quantity) {
    //récup du panier dejà existant
    let panier = getPanier();
    //Trouver avec find() si element ID est égale à l'ID du produit same pour la couleur
    let foundProduct = panier.find(
        (p) => p._id == product._id && p.color == color
    );
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        // Si la quantité estt supérieur à 100, celle_ci se met à 100
        if (foundProduct.quantity > 100) {
            foundProduct.quantity = 100;
        }
        // si la quantité est inférieur à 1, celle-ci se met à 1
        if (foundProduct.quantity < 1) {
            foundProduct.quantity = 1;
        }
    } else {
        productInfo = {};
        productInfo._id = product._id;
        productInfo.quantity = quantity;
        productInfo.color = color;
        panier.push(productInfo);
    }

    savePanier(panier);
}

///variable avec change() pour les <select>

var colors = document.getElementById("colors");
colors.addEventListener("change", (e) => {
    color = e.target.value;
});

let color = "";

/// pareil mais avec parseInt pour pouvoir lire la chaîne de caractère en entier
var quantity = document.getElementById("quantity");
quantity.value = 1;
quantity.addEventListener("change", (e) => {
    if (quantity.value < 1) {
        quantity.value = 1;
    } else if (quantity.value > 100) {
        quantity.value = 100;
    }
});

//// Bouton pour ADD, addEventListener au clic, et les conditions
buttonPanier.addEventListener("click", () => {
    //// Si la couleur et la quantité ne sont pas saisis =>alert
    if (color == "" && quantity.value == "") {
        color;
        updateQuantity;
        alert("Veuillez choisir une couleur et une quantité");
        ////si la couleur n'est pas saisi => alert
    } else if (color == "") {
        color;
        alert("Veuillez choisir une couleur");
        ////Si la quantité n'est pas saisi => alert
    } else if (quantity.value == "") {
        updateQuantity;
        alert("Veuillez choisir une quantité");
        ///Si tout est ok => Envoi du  produit ajouté dans le localStorage
    } else {
        let currentQuantity = findQuantityInPanier(product._id, color);
        let updateQuantity = parseInt(quantity.value);
        if (currentQuantity + updateQuantity > 100) {
            alert("La disponibilité de ce produit est de 100 quantités maximum");
            quantity.value = 100 - currentQuantity;
        } else if (currentQuantity + updateQuantity <= 0) {
            alert("Veuillez choisir une quantité supérieur à 0");
        } else {
            addPanier(product, color, updateQuantity);
            alert("Le produit a bien été ajouté au panier");
            document.location = "../html/cart.html";
        }
    }
});