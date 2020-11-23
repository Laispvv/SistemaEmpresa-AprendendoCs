// pega o id do botão de login
//var loginB = document.getElementById("loginButton");
//pega id do botão eye
var buttonEye = document.getElementById("buttonEye");

// Função do botão de login -> verificar validade da entrada
onLoginClick = function () {
    debugger
    console.log("olá");
    var email = document.getElementById("emailInput").value;
    var senha = document.getElementById("passwordInput").value;
    var msg = document.getElementById("acessDenied");

    var flag = false;
    const userList = JSON.parse(localStorage.getItem('userList'));

    //se apagar a lista, então ele faz o login pra gerar a lista, porem define como falsa a autenticação
    if (userList == null) {
        // localStorage.setItem("autentication", false);
        // window.location.href = '/dashboard/dashboard.html';
        msg.textContent = "Usuário ou senha incorretos";

    }
    else {
        for (var i = 0; i < userList.length; i++) {
            //se achar um usuário e senha que batem, então quebra e valida
            if (userList[i].name == email && userList[i].password == senha) {
                flag = true;
                break;
            }
        }
    }
    if (flag) {
        msg.textContent = "";
        if (document.getElementById("rememberSession").checked) {
            localStorage.setItem("autentication", true);
        }
        else {
            sessionStorage.setItem("autentication", true);
        }

        window.location.href = '/dashboard/dashboard.html';
    }
    else {
        msg.textContent = "Usuário ou senha incorretos";
    }
};
                                

// Faz o botão funcionar login funcionar
//loginB.addEventListener("click", onLoginClick);

//faz o botão de toggle visibility funcionar
buttonEye.addEventListener("click", function () {
    var passwordInput = document.getElementById("passwordInput");
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
    }
    else {
        passwordInput.type = "password";
    }
});