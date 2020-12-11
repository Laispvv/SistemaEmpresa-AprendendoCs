var currentPage = 1;

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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function nextColorUpdate() {
    //muda o estilo da página anteriormente clicada
    $("#" + currentPage + "button").css("background-color", "white");
    $("#" + currentPage + "button").css("color", "rgb(68, 68, 68");
    //aumenta o contador da página

    if (currentPage < 5) currentPage++;

    //muda o estilo da página posteriormente clicada
    $("#" + currentPage + "button").css("background-color", "#22bee6");
    $("#" + currentPage + "button").css("color", "white");
}

function previousColorUpdate() {
    //muda o estilo da página anteriormente clicada
    $("#" + currentPage + "button").css("background-color", "white");
    $("#" + currentPage + "button").css("color", "rgb(68, 68, 68");
    //aumenta o contador da página

    if (currentPage > 1) currentPage--;

    //muda o estilo da página posteriormente clicada
    $("#" + currentPage + "button").css("background-color", "#22bee6");
    $("#" + currentPage + "button").css("color", "white");
}

function onNextClick() {
    nextColorUpdate();

    //update numbers
    for (var i = 1; i < 6; i++) {
        var idButton = "#" + i + "span";
        var num = Number($(idButton).text());
        $(idButton).text(num+1);
    }
}

function onPreviousClick() {
    previousColorUpdate();

    //update numbers
    if (Number($("#1span").text()) > 1) {
        for (var i = 1; i < 6; i++) {
            var idButton = "#" + i + "span";
            var num = Number($(idButton).text());
            $(idButton).text(num - 1);
        }
    }
}
