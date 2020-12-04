# Sistema de Empresa

Sistema de empresa com tela de login, dashbord dos funcionários e formulário de adição de novos funcionários.

## Parte 0 - Instalação e Versões

A versão mais estável atualmente é a **.NET Core 5.0 SDK**, é tudo que precisa instalar para começar a desenvolver de fato.

### Tipos de Projetos

- Para criar uma versão web:
  - Selecionar o `ASP.NET Core Web Application.`
  - Usar o .Net Core e a versão escolhida.
  - Este projeto utiliza o `Web Application (Model-View-Controller)` com uma autenticação (Utiliza o Identity).
  
## Parte 1 - Entity Framework

### O que é

É uma framework que permite trabalhar com banco de dados sem a necessidade de classes DAO ou lidar diretamente com códigos SQL. 

### Configurando

##### Para criar um DB:

Vai no SQL server explorer e adiciona um banco de dados no localdb. Podemos criar a tabela da forma SQL criando primeiro a tabela e depois o código ou primeiro o código que vai gerar a tabela.

##### Para instalar o Entity:

Instala o pacote `Microsoft.EntityFrameworkCore.SqlServer` pelo NuGet

##### Modificações:

Criamos uma classe que herda **DbContext** e tem o **nome da aplicaçãoContext**:
  - Na classe cria propriedades que retornam `DbSet<Objeto>` com o nome que queremos para a tabela.
  - A classe que herda **DbContext** deve implementar também o override de `OnConfiguring`

Após configurada, podemos salvar, deletar, atualizar objetos usando o Entity com os seguintes comandos &rarr; **Esse método não funciona em projetos MVC**:
  ```cs
    using (contexto = new LojaContext()){ //LojaContext é o banco de dados
      contexto.Produtos.Add(produto)  //Produtos é o nome da tabela
      IList<Produto> produtos = coontexto.Produtos.ToList(); //Retorna a lista de itens salvos na tabela Produtos
      contexto.Produtos.Remover(produto); //remove o produto do banco
      contexto.Produtos.Update(produto); //atualiza um produto do banco
      
      contexto.SaveChanges(); //precisamos salvar as mudanças após cada mudança para ela persistir no banco
    }
  ```

##### Migrations

Instalar o pacote **`Microsoft.EntityFrameworkCore.Tools`** para ter acesso às migrações &rarr; atualizam o banco de dados automaticamente com base no modelo de classes do projeto.

**Precisamos adicionar uma migração inicial para começar a utilizar o banco de dados!**

Passo a passo:
  - adicionar uma migração &rarr; `Add-Migration nome_migracao`
  - atualizar o banco &rarr; `Update-Database`

Quando damos update, cria uma pasta migrations com classes que definem a criação da tabela (função up) ou o retorno para a migração antiga (função down).

##### Relacionamentos

Quando queremos fazer um **relacionamento de muitos para muitos**, temos que fazer uma lista de objetos nas duas classes que queremos relacionar entre elas:
```cs
  public class Book
  {
    public int BookId { get; set; }
    public string Title { get; set; }
    public List<Category> Categories { get; set; }
  }

  public class Category
  {
      public int CategoryId { get; set; }
      public string CategoryName { get; set; }
      public List<Book> Books { get; set; }
  }
```

E então devemos adicionar na classe context no método `OnModelCreating` 

```cs
 modelBuilder.Entity<BookCategory>()
            .HasKey(bc => new { bc.BookId, bc.CategoryId });
  base.OnModelCreating(modelBuilder);
```

##### Para Projetos MVC

Passo a passo de como criar e utilizar o EntityFrameworkCore neste tipo de projeto:

1. Criar a classe do banco de dados que herda o DbContext, porém com o método override OnModelCreating:
    ```cs
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Pessoa>().HasKey(t => t.Id);
        }
    ```
2. No arquivo `appsettings.json` adicionar uma `ConnectionStrings` com a connectionString do banco de dados.
3. Criamos uma classe para cuidar da inicialização do banco de dados &rarr; `DataServices` que deve implementar a interface `IDataServices`
4. Na classe `Startup`:
   1. No método `ConfigureServices` adicionar aos serviços o DbContext:
   ```cs
    string connectionString = Configuration.GetConnectionString("Default");
    services.AddDbContext<OutroTesteContext>(options => 
            options.UseSqlServer(connectionString));

    services.AddTransient<IDataServices, DataService>();
   ```
   1. No método `Configure` adicionamos o `IServiceProvider` na chamada do método e chamamos ele para garantir que a Database foi criada:
    ```cs
    serviceProvider.GetService<IDataServices>().inicializaDb();
   ```

## Parte 2 - Identity

### O que é

O identity é um framework que facilita a autenticação e login de usuários no sistema. Funciona com todas as tecnologias do ASP.NET Core

- Tem integração com o banco de dados SQLite.
- Para adicionar na criação do projeto: 

![Onde alterar autenticação](Autentication.png)

- caso já esteja criado, deve clicar no projeto com o botão direito &rarr; add &rarr; new Scaffold Item
  - ao adicionar um Scaffold, devemos colocar ele na view `_Layout.cshtml`.

### Login externo

Permite fazer login na aplicação com um provedor externo, tipo google ou facebook.
- Ir no site da Microsoft adicionar um aplicativo.
- Gerar uma senha para o aplicativo e configurar o tipo de plataforma dele e Url de redirecionamento.

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

##### Para alterar as características do banco SQLite:

- Deve adicionar propriedades à classe existente `AppIdentityUser` e depois criar uma migração e aplicar ela para atualizar a tabela de usuário. Ex:
  ```cs
  public class AppIdentityUser : IdentityUser
  {
      public string PropriedadeCustom { get; set; }
  }
  ```
