using Microsoft.AspNetCore.Mvc;
using SistemaTeste2.Models;
using SistemaTeste2.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        //[HttpPost] -> cuidar disso depois, para só ter acesso dps de logar pelo login
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
    }
}
