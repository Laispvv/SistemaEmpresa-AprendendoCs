var deleteUser = function (botao) {
    console.log(botao);
    console.log($(botao).parent().parent());

    $(botao).parent().parent().remove();
}

var onCancelButtonClick = function (botao) {
    if (verifyAutentication()) {
        deleteUser(botao);
    }
}

//var onCogButtonClick = function (botao) {
//    console.log(botao);
//    console.log(selectUser(botao.id));
//}


var onAddNewUserClick = function () {
    //@{ Response.Redirect("~/Sistema/Form"); }
    // verifyAutentication para poder adicionar novos usuários
    //if (verifyAutentication()) {
    //    window.location.href = '/form/form.html';
    //}
}

var exportToExcel = document.getElementById("exportToExcel");

exportToExcel.addEventListener("click", function () {
    console.log("export to excel");
});

//ajeitando parte de paginação
//pinta o botão da página atual de azul
var buttonPage = document.getElementById(currentPage + "button");
buttonPage.style = "color: white;background-color: #22bee6;";

//mostra a quantidade certa de entries e showing baseado nas variáveis no dashboard.js
var currentEntrieVar = document.getElementById("currentEntrie");
currentEntrieVar.innerHTML = currentEntrie;
var totalAmountVar = document.getElementById("totalAmount");
totalAmountVar.innerHTML = entriesAmount;