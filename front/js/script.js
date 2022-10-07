//// connexion à l'API pour récupérer tout les produits avec fetch ////

fetch("http://localhost:3000/api/products")
    ///promesse qui renvoi une réponse en json
    .then((reponse) => reponse.json())
    ///récupération de la réponse
    .then((secondReponse) => {
        /// utilisation de forEach pour executer la fonction ci-dessous sur tout les éléments du tableau
        secondReponse.forEach((element) => {
            ///// Modification du DOM avec innerHTML/////
            let html = `
            <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>
          `;
            /// Intégration de let html avec innerHTML dans le items grâce à document.getElementByID
            document.getElementById("items").innerHTML += html;
        });
    });