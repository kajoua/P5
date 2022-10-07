// Récupéreration l'id de la page de l'URL
const idUrl = window.location.search;
// Créer une variable pour récupérer seulement le ID sans ?=
////// .split() pour séparer
let words = idUrl.split("=");
///Création variable product pour pouvoir l'intégrer dans le addPanier
let product = {};
let panier = getPanier();
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
    } else {
        product.quantity = quantity;
        quantity += updateQuantity;
        product.color = color;
        panier.push(product);
    }

    savePanier(panier);
}
//// Bouton pour ADD, addEventListener au clic, et les conditions
buttonPanier.addEventListener("click", () => {
    //// Si la couleur et la quantité ne sont pas saisis =>alert
    if (color == "" && updateQuantity == "") {
        color;
        updateQuantity;
        alert("Veuillez choisir une couleur et une quantité");
        ////si la couleur n'est pas saisi => alert
    } else if (color == "") {
        color;
        alert("Veuillez choisir une couleur");
        ////Si la quantité n'est pas saisi => alert
    } else if (updateQuantity == "") {
        updateQuantity;
        alert("Veuillez choisir une quantité");
        ///Si tout est ok => Envoi du  produit ajouté dans le localStorage
    } else {
        addPanier(product, color, updateQuantity);
    }
});
///variable avec change() pour les <select>

var colors = document.getElementById("colors");
colors.addEventListener("change", (e) => {
    color = e.target.value;
});
let color = "";
/// pareil mais avec parseInt pour pouvoir lire la chaîne de caractère en entier
var quantity = document.getElementById("quantity");
quantity.addEventListener("change", (e) => {
    updateQuantity = parseInt(document.getElementById("quantity").value);
});
let updateQuantity = "";