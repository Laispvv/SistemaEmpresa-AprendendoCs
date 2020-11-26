# Sistema de Empresa

Sistema de empresa com tela de login, dashbord dos funcionários e formulário de adição de novos funcionários.

## Parte 0 - Instalação e Versões

A versão mais estável atualmente é a .NET Core 5.0 SDK, é tudo que precisa instalar para começar a desenvolver de fato.

### Tipos de Projetos

- Para criar uma versão web:
  - Selecionar o `ASP.NET Core Web Application.`
  - Usar o .Net Core e a versão escolhida.
  - Este projeto utiliza o `Web Application (Model-View-Controller)` com uma autenticação (Utiliza o Identity).
## Parte 3 - Identity

### O que é

O identity é um framework que facilita a autenticação e login de usuários no sistema. Funciona com todas as tecnologias do ASP.NET Core

- tem integração com o banco de dados SQLite, então é necessário usar ele no projeto.

- o ideal é implementar essa Framework desde o começo -> ao criar o projeto mudamos a autenticação do projeto.

![Onde alterar autenticação](Autentication.png)

- caso já esteja criado, deve clicar no projeto com o botão direito -> add -> new Scaffold Item
  - ao adicionar um Scaffold, devemos colocar ele na view `_Layout.cshtml`.

### SQlite

O Identity usa o SQlite, para isso, é preciso instalar ele no projeto com o NuGet, e então fazer uma migration do banco para a versão que utiliza o SQlite, da seguinte forma:
  - Adicionamos uma Migration especificando como context o do Identity: `Add-Migration "Identity"  -Context AppIdentityContext`.
  - Aplicamos a migração para criar o banco `Update-Database -Context AppIdentityContext`.
  
### Configurando

##### Para alterar o idioma e conteúdo e das mensagens e dos erros:

- Altera nos arquivos `_LoginPartial.cshtml`, `Login.cshtml` e `Logout.cshtml` para mudar as mensagens da view.

- Altera o arquivo `IdentityHostingStartup.cs` para mudar as mensagens de erro:
  - Adiciona em services uma classe descritora de erros `.AddErrorDescriber<IdentityErrorDescriberPtBr>()` e cria essa classe `IdentityErrorDescriberPtBr` herdando `IdentityErrorDescriber` dando override em todos os métodos. Ex:
  ```cs
    public override IdentityError PasswordRequiresLower()
    {
      return new IdentityError
      {
        Code = nameof(PasswordRequiresLower),
        Description = "A senha deve ter pelo menos um caracter minúsculo."
      };
    }
  ```
  - Para eliminar determinadas características da senha, no `AddDefaultIdentity()` deve-se mudar as options, colocando `AddDefaultIdentity(options =>{})` e definindo como false os atributos `options.Password.`


