// inicialização de variáveis chaves
var entriesAmount = 25;
var currentEntrie = 5;
var currentPage = 3;
// var peopleQt = 6;

// =============================================================== Criação de Person ===================================================================
//var Person = function (name, dateCreated, role, status, password, photo) {
//    this.id = generateId();
//    this.name = name;
//    this.dateCreated = dateCreated;
//    this.role = role;
//    this.status = status;
//    this.photo = photo;
//    this.password = password;
//}

//var statusIconObj = function (obj) {
//    if (obj.status == "Active") {
//        return "<i class=\"fa fa-circle\" aria-hidden=\"true\" id=\"statusIcon\" style=\"font-size: 12px;color: #6ed659;\"></i>";
//    }
//    else if (obj.status == "Inactive") {
//        return "<i class=\"fa fa-circle\" aria-hidden=\"true\" id=\"statusIcon\" style=\"font-size: 12px;color:  #d6d459;\"></i>";
//    }
//    else return "<i class=\"fa fa-circle\" aria-hidden=\"true\" id=\"statusIcon\" style=\"font-size: 12px;color: #dd405a;\"></i>";
//}

//var createItemForObject = function (obj, index) {
//    var idDoObj = obj.id;
//    var html = 
//        `<tr id=${idDoObj}>
//            <td> ${index} </td>
//            <td> ${obj.photo}
//                <span>
//                    ${obj.name}
//                </span>
//            </td>
//            <td> ${obj.dateCreated} </td>
//            <td> ${obj.role} </td>
//            <td> ${statusIconObj(obj)} ${obj.status} </td>
//            <td>
//                <button id="${idDoObj}"  onClick=onCogButtonClick(this) class="cogIcon ${idDoObj}">
//                    <i class="fa fa-cog ${idDoObj}" aria-hidden="true" style="color:#22bee6;"></i>
//                </button>
//                <button id="${idDoObj}" onClick=onCancelButtonClick(this) class="cancelIcon ${idDoObj}">
//                    <i id="${idDoObj}" class="fa fa-times-circle ${idDoObj}" aria-hidden="true" style="color:#dd405a;"></i>
//                </button>
//            </td>
//        </tr>`;
//    return html;
//}

//var generateId = function() {
//    //o que ta acontecendo: o replace é chamado nessa string, onde ele troca todos os x e y -> (/[xy]/g representra a troca de todas as ocorrências)
//    // por algo que a function gera
//    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//        return v.toString(16);
//    });
//}
//permite string replacement por index
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// =================================================================================================================================================

//people é definida uma vez fora do do load da tela, então é sobescrita depois
var people = [];

var updateLocalStorage = function(lista){
    console.log(lista);
    localStorage.setItem('userList', JSON.stringify(lista));
}

var verifyAutentication = function(){
    var autentication = localStorage.getItem('autentication');
    var autenticationSession = sessionStorage.getItem('autentication'); 

    //verificando se a pessoa ta logada para poder acessar o sistema:
    if ((!autentication && !autenticationSession) || autentication == "false" ) {
        window.location.href = '/login/login.html'; //se nao ta logado redireciona para a tela de login
        return false;
    }
    return true;
}

var updateView = function(){
    // verifyAutentication();

    const listaParseada = JSON.parse(localStorage.getItem('userList')); //devolve a user list como uma lista de objetos
    //definindo a lista de pessoas igual a lista parseada para garantir que ids permanecem iguais
    people = listaParseada;

    var cont = 1;
    var html = "<tr>";
    listaParseada.forEach(p => {
        //função que adiciona a pessoa na tela
        html += createItemForObject(p, cont);
        cont++;
    });


    html += "</tr>";

    $("#tableBody").html(html);    
}

//window.addEventListener('DOMContentLoaded', function () {
    
//    verifyAutentication();    
    
//    if (!localStorage.getItem('userList')) {
//        console.log('nao tem userList, entao deve carregar lista padrao')
//        updateLocalStorage(people);
//    }
        
//    //pega informação de todos os containers
//    var name = localStorage.getItem('namePerson');
//    var day = localStorage.getItem('day');
//    var month = localStorage.getItem('month');
//    var year = localStorage.getItem('year');
//    var role = localStorage.getItem('rolePerson');
//    var status = localStorage.getItem('statusPerson');
//    var imgurl = localStorage.getItem('imageUrl');
//    var password = localStorage.getItem('password');
//    var image = `<img src="data:image/png;base64,${imgurl}" alt="${name}" >`;
    
//    if(localStorage.getItem("updateUser")){
//        var i = localStorage.getItem("updateUser");
//        const listaParseada = JSON.parse(localStorage.getItem('userList'));
//        console.log(listaParseada[i].name);

//        if(name != "") listaParseada[i].name = name;
//        //muda a data individualmente
//        if(day != 0) listaParseada[i].dateCreated = listaParseada[i].dateCreated.replaceAt(0, day);
//        if(month != 0) listaParseada[i].dateCreated = listaParseada[i].dateCreated.replaceAt(3, month);
//        if(year != 0) listaParseada[i].dateCreated = listaParseada[i].dateCreated.replaceAt(6, year);

//        if (status != 0) listaParseada[i].status = status;
//        if (role != "") listaParseada[i].role = role;

//        if(imgurl != null) listaParseada[i].photo = image;
//        if(password != "")listaParseada[i].password = password;

//        updateLocalStorage(listaParseada);
//        people = listaParseada;
        
//        //deletando o update user:
//        localStorage.removeItem('updateUser');
//    }else{
//        //verificando se as variáveis de pessoa são válidas para adicionar a pessoa
//        if(name && day && month && year && role  && status && image && password){
//            var date = `${day}/${month}/${year}`;
//            var newPerson = new Person(name, date, role, status, password, image);
            
//            const listaParseada = JSON.parse(localStorage.getItem('userList')); //devolve a user list como uma lista de objetos
//            listaParseada.push(newPerson);
//            updateLocalStorage(listaParseada);
//            people = listaParseada;
//        }
//    }    

//    // remove as variaveis locais criadas dps da pessoa adicionada ou update
//    localStorage.removeItem('namePerson');
//    localStorage.removeItem('day');
//    localStorage.removeItem('month');
//    localStorage.removeItem('year');
//    localStorage.removeItem('statusPerson');
//    localStorage.removeItem('rolePerson');
//    localStorage.removeItem('imageUrl');
//    localStorage.removeItem('password');

//    updateView();
// }, false);



