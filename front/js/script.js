fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((secondReponse) => console.table(secondReponse));