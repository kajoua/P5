////Récupération de l'url et de l'ID comme pour la page produit avec un split 
const idUrl = window.location.search;
let words = idUrl.split("=");
////Associer avec un getElementById/ innerHTML, la deuxième partie de l'url séparé par split soit [1]
document.getElementById("orderId").innerHTML = words[1];