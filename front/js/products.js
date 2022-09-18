// Récupérer l'id de la page de l'URL
const idUrl = window.location.search;
let product = {};
let panier = getPanier();
// Créer une variable pour récupérer seulement le ID sans ?
let words = idUrl.split("=");

// Récupérer les données de l'api - Associer l 'ID de la page avec l'id correspondant de l 'API
const fetchId = async() => {
    await fetch(`http://localhost:3000/api/products/${words[1]}`)
        .then((response) => response.json())
        .then((produit) => {
            product = produit;
            buildHtml(produit);
        });
};
fetchId();

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

    element.colors.forEach((color) => {
        let optionColors = document.createElement("option");
        optionColors.innerHTML = `${color}`;

        htmlSelect.appendChild(optionColors);
    });
};

// récupérer les informations de Build HTML dans le local storage

// Associer le bouton valider au panier en envoyant les informations dans le panier

let buttonPanier = document.getElementById("addToCart");

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

function addPanier(product, color, quantity) {
    let panier = getPanier();
    let foundProduct = panier.find((p) => p.id == product.id && p.color == color);
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

buttonPanier.addEventListener("click", () => {
    addPanier(product, color, updateQuantity);
});

var colors = document.getElementById("colors");
colors.addEventListener("change", (e) => {
    color = e.target.value;
});
let color = "";

var quantity = document.getElementById("quantity");
quantity.addEventListener("change", (e) => {
    updateQuantity = parseInt(document.getElementById("quantity").value);
});
let updateQuantity = "";