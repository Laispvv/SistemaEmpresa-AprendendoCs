using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SistemaTeste2.Areas.Identity;
using SistemaTeste2.Areas.Identity.Data;
using SistemaTeste2.Models;
using SistemaTeste2.Repositories;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaTeste2.Controllers
{
    public class SistemaController : Controller
    {
        private readonly IPersonRepository personRepository;
        private readonly UserManager<AppIdentityUser> userManager;

        public SistemaController(IPersonRepository personRepository,
            UserManager<AppIdentityUser> userManager)
        {
            this.personRepository = personRepository;
            this.userManager = userManager;
        }

        public IActionResult Login()
        {
            return View();
        }
        
        public IActionResult Form()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        public IActionResult Dashboard()
        {
            return View(personRepository.GetPeople());
        }
        public IActionResult CreateFile()
        {
            string nomeArquivoCSV = "C:\\Users\\Laís\\Downloads\\pessoasExportadas.csv";
            var people = personRepository.GetPeople();
            using (var file = new FileStream(nomeArquivoCSV, FileMode.Create))
            using (var escritor = new StreamWriter(file, Encoding.UTF8))
            {
                foreach (var item in people)
                {
                    escritor.WriteLine(item.ToString());
                }
            }
            return RedirectToAction("Dashboard");
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePessoasAsync([FromBody]Person person)
        {
            var pessoas = personRepository.GetPeople();
            //pessoa = pessoa sem atualização de dados
            var pessoa = personRepository.UpdatePessoas(person);

            //acha o user com determinado email
            var user = await userManager.FindByNameAsync(pessoa.Email);
            //user id contêm o id do usuário logado
            var userId = userManager.GetUserId(HttpContext.User);
            var userAtual = userManager.FindByIdAsync(userId).Result;

            //entra no if se o usuário não for nulo ou for o usuário logado
            if(user != null || userAtual.UserName == pessoa.Email)
            {
                //verifica se ouve a atualização em um dos campos
                if (person.Email != "")
                {
                    user.Email = person.Email;
                    user.UserName = person.Email;
                }
                var passwordHash = new PasswordHasher<AppIdentityUser>().HashPassword(user, person.Password);
                if (person.Password != "") user.PasswordHash = passwordHash;
                await userManager.UpdateAsync(user);
            }
            //atualiza o SQLite

            //retorna uma url para redirecionar quando o ajax chama
            //quando tiver acabado de adicionar vai chamar a view da dashboard!
            return Json(new { ok = true, newurl = Url.Action("Dashboard") });
        }

        [HttpPost]
        public async Task<IActionResult> AddPessoaAsync([FromBody]Person person)
        {
            personRepository.AddPessoa(person);
            
            var appUser = new AppIdentityUser(person.Email, person.Email);
            await userManager.CreateAsync(appUser, person.Password);
            //quando tiver acabado de adicionar vai chamar a view da dashboard!
            return Json(new {ok=true, newurl = Url.Action("Dashboard") });
        }

        [HttpPost]
        public async Task DeletePessoaAsync([FromBody]int id)
        {
            var pessoas = personRepository.GetPeople();
            personRepository.DeletePessoa(id);
            var user = await userManager.FindByNameAsync(pessoas
                .Where(p => p.Id == id)
                .SingleOrDefault()
                .Email);
            if (user != null)
            {
                await userManager.DeleteAsync(user);
            }
        }

        [HttpPost]
        public IActionResult VerificarAutenticacao([FromBody]Login login)
        {
            var pessoas = personRepository.GetPeople();
            var isLogged = pessoas.Where(p => p.Name == login.User && p.Password == login.Password).SingleOrDefault();

            if (isLogged != null) return Json(new { ok = true, newurl = Url.Action("Dashboard") });

            return Json(new { ok = false, newurl = Url.Action("Login") });
        }
    }
}
