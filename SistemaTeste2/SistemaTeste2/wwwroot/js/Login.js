// pega o id do botão de login
//var loginB = document.getElementById("loginButton");
//pega id do botão eye
var buttonEye = document.getElementById("buttonEye");

// Função do botão de login -> verificar validade da entrada
onLoginClick = function () {
    console.log("olá");
    var email = document.getElementById("emailInput").value;
    var senha = document.getElementById("passwordInput").value;
    var msg = document.getElementById("acessDenied");
    var data = {
        User: email,
        Password: senha
    };

    $.ajax({
        type: "POST",
        url: '/sistema/VerificarAutenticacao',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (info) {
            if (info.ok) {
                msg.textContent = "";
                if (document.getElementById("rememberSession").checked) {
                    localStorage.setItem("autentication", true);
                }
                else {
                    sessionStorage.setItem("autentication", true);
                }
                //window.location = info.newurl;
            }

            else {
                msg.textContent = "Usuário ou senha incorretos";
            }
        }
    });


    if (sessionStorage.getItem("autentication")) {
        $.ajax({
            type: "POST",
            url: '/sistema/Dashboard',
            contentType: 'application/json',
            success: function (algo) {
                console.log("oaldsjf");
                window.location = algo;
            }
        });
                                
    }
}

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