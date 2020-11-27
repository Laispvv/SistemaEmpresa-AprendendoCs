var deleteUser = function (botao) {
    console.log(botao);
    console.log($(botao).parent().parent());
    var id = $(botao).attr("id");
    $(botao).parent().parent().remove();

    $.ajax({
        url: '/sistema/DeletePessoaAsync',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(id)
    });
}

var onCancelButtonClick = function (botao) {
    if (verifyAutentication()) {
        deleteUser(botao);
    }
}

//ajeitando parte de paginação
//pinta o botão da página atual de azul
var buttonPage = document.getElementById(currentPage + "button");
buttonPage.style = "color: white;background-color: #22bee6;";

//mostra a quantidade certa de entries e showing baseado nas variáveis no dashboard.js
var currentEntrieVar = document.getElementById("currentEntrie");
currentEntrieVar.innerHTML = currentEntrie;
var totalAmountVar = document.getElementById("totalAmount");
totalAmountVar.innerHTML = entriesAmount;