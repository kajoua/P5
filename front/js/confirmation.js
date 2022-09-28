const idUrl = window.location.search;
let words = idUrl.split("=");
document.getElementById("orderId").innerHTML = words[1];