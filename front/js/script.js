fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((secondReponse) => {
        secondReponse.forEach((element) => {
            let html = `
            <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>
          `;
            document.getElementById("items").innerHTML += html;
        });
    });