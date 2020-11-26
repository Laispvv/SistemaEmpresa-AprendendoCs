using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaTeste2.Models;
using SistemaTeste2.Repositories;
using System.IO;
using System.Linq;
using System.Text;

namespace SistemaTeste2.Controllers
{
    public class SistemaController : Controller
    {
        private readonly IPersonRepository personRepository;

        public SistemaController(IPersonRepository personRepository)
        {
            this.personRepository = personRepository;
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
        public IActionResult UpdatePessoas([FromBody]Person person)
        {
            personRepository.UpdatePessoas(person);
            //retorna uma url para redirecionar quando o ajax chama
            //quando tiver acabado de adicionar vai chamar a view da dashboard!
            return Json(new {ok=true, newurl = Url.Action("Dashboard") });
        
            //return RedirectToAction("Dashboard");
        }
        [HttpPost]
        public IActionResult AddPessoa([FromBody]Person person)
        {
            personRepository.AddPessoa(person);
            return Json(new {ok=true, newurl = Url.Action("Dashboard") });
            //quando tiver acabado de adicionar vai chamar a view da dashboard!
        }

        [HttpPost]
        public void DeletePessoa([FromBody]int id)
        {
            personRepository.DeletePessoa(id);
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
