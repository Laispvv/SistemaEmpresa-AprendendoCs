//var inputs = document.getElementsByTagName("input");
//var selects = document.getElementsByTagName("select");

new InputMask().Initialize(document.querySelectorAll("#phone"), {
    mask: InputMaskDefaultMask.Phone,
    placeHolder: "ex. (99) 99999-9999"
});

function validaEmail(email) {
    er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

    if (er.exec(email)) {
        return true;
    } else {
        return false;
    }
}

//function testePinta(event) {
//    // pega o asterisco para mudar pra exclamação
//    var x = event.parentNode.childNodes[3];
//    // console.log(x);
//    if (!event.checkValidity()) {
//        event.style.borderColor = "orange";
//        event.style.boxShadow = "1px 1px 10px orange";
//        x.className = "fa fa-exclamation";

//    }
//    else if (event.checkValidity()) {
//        event.style.boxShadow = "none";
//        event.style.borderColor = "#dcdcdc";
//        x.className = "fa fa-asterisk";
//    }
//}

//function saveChanges() {
//    //pega as informações dos inputs e salva
//    //no local storage como propriedades do objeto
//    // console.log(document.getElementById("lastNameInput").value);
//    var name = document.getElementById("inputNome").value;
//    // var lastName = document.getElementById("lastNameInput").value;
//    var role = document.getElementById("passportInput").value;
//    var status = document.getElementById("language").value;
//    var day = document.getElementById("day").value;
//    var month = document.getElementById("month").value;
//    var year = document.getElementById("year").value;
//    var password = document.getElementById("countryInput").value;

//    // var date = day + "/" + month + "/" + year;
//    if (status == '1') {
//        status = "Active";
//    } else if (status == '2') {
//        status = "Inactive";
//    } else if (status == '3') {
//        status = "Suspended";
//    }

//    localStorage.setItem('namePerson', name);
//    // localStorage.setItem('lastNamePerson', lastName);
//    localStorage.setItem('rolePerson', role);
//    localStorage.setItem('statusPerson', status);
//    localStorage.setItem('day', day);
//    localStorage.setItem('month', month);
//    localStorage.setItem('year', year);
//    // localStorage.setItem('datePerson', date);
//    localStorage.setItem('password', password);

//    if (localStorage.getItem("updateUser")) {
//        window.location.href = "/dashboard/dashboard.html";
//    }

//    //parte que verifica a validade dos inputs, se for válido redireciona para o dashboard
//    if (name && role && password && status != 0 && day != 0 && month != 0 && year != 0 && localStorage.getItem('imageUrl')) {
//        console.log("informações essenciais preenchidas!");
//        window.location.href = "/dashboard/dashboard.html";
//    }
//    else {
//        alert("Por favor, preencha todos os campos necessários!");
//    }

//    for (var i = 0; i < inputs.length; i++) {
//        checkInputs(inputs[i]);
//    }
//    for (var i = 0; i < selects.length; i++) {
//        checkSelects(selects[i]);
//    }
//}

//function checkSelects(select) {
//    if (select.value == 0) {
//        // console.log(select.className);
//        select.className = "inputInvalid";
//        select.style.boxShadow = "1px 1px 1 orange";
//    }
//    else {
//        select.className = "inputValid";
//    }
//}

//function emailCheck(input) {
//    if (validaEmail(input.value)) {
//        input.parentNode.childNodes[7].style.visibility = "hidden";
//        input.parentNode.childNodes[5].className = "glyphicon glyphicon-asterisk form-control-feedback"
//        input.className = "inputValid";
//    }
//    else {
//        input.parentNode.childNodes[7].style.visibility = "visible";
//        input.parentNode.childNodes[5].className = "glyphicon glyphicon-exclamation-sign form-control-feedback"
//        input.className = "inputInvalid";

//    }
//}

//function checkInputs(input) {
//    if (input.className == "email") {
//        emailCheck(input);
//    }
//    else if (input.className != "image") {
//        if (input.checkValidity()) {
//            if (input.parentNode.childNodes[3].className == "namel") {
//                input.parentNode.childNodes[7].className = "glyphicon glyphicon-asterisk form-control-feedback"
//            }
//            else {
//                input.parentNode.childNodes[5].className = "glyphicon glyphicon-asterisk form-control-feedback"
//            }
//            input.className = "inputValid";
//        }
//        else {
//            if (input.parentNode.childNodes[3].className == "namel") {
//                input.parentNode.childNodes[7].className = "glyphicon glyphicon-exclamation-sign form-control-feedback"
//            }
//            else {
//                input.parentNode.childNodes[5].className = "glyphicon glyphicon-exclamation-sign form-control-feedback"
//            }
//            input.className = "inputInvalid";
//        }
//    }
//}

//function deleteFile() {
//    var image = document.getElementById('profile');
//    image.src = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_357118.png&f=1&nofb=1";
//}

//function loadFile(event) {
//    var image = document.getElementById('profile');
//    //salva o arquivo como uma URL,
//    var imageURL = new URL(URL.createObjectURL(event.target.files[0]));

//    // localStorage.setItem('imageURL', JSON.stringify(imageURL));
//    image.src = imageURL;
//}

////função que salva imagem carregada na base64
//document.getElementById('file').addEventListener('change', (e) => {
//    const file = e.target.files[0];
//    const reader = new FileReader();
//    reader.onloadend = () => {
//        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
//        localStorage.setItem('imageUrl', base64String);
//    };
//    reader.readAsDataURL(file);
//})