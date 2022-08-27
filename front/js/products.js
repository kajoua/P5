// Récupérer l'id de la page de l'URL
const idUrl = window.location.search;
console.log(idUrl);

// Créer une variable pour récupérer seulement le ID sans ?
let words = idUrl.split("=");

// Récupérer les données de l'api - Associer l 'ID de la page avec l'id correspondant de l 'API
const fetchId = async() => {
    await fetch(`http://localhost:3000/api/products/${words[1]}`)
        .then((response) => response.json())
        .then((json) => {
            buildHtml(json);
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
};

// Maintenant que l'association-effectué => Associer les elements du tableau à l'HTML

// Associer le bouton valider au panier en envoyant les informations dans le panier