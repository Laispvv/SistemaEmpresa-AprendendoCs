using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SistemaTeste2.Models;
using SistemaTeste2.Repositories;
using System.Collections.Generic;
using System.IO;
using static SistemaTeste2.Repositories.PersonRepository;

namespace SistemaTeste2
{
    class DataService : IDataService
    {
        private readonly ApplicationContext contexto;
        private readonly IPersonRepository personRepository;

        public DataService(ApplicationContext contexto, IPersonRepository personRepo)
        {
            this.contexto = contexto;
            this.personRepository = personRepo;
        }

        public void InicializaDb()
        {
            contexto.Database.EnsureCreated();
            //verifica se a lista já foi criada para não repetir os elementos dela
            if (personRepository.ExistsPeoples())
            {
                return;
            }
            var pessoas = GetPessoas();

            //carrega para o banco de dados as informações do arquivo pessoas.json
            personRepository.SavePessoas(pessoas);
        }

        private static List<Pessoa> GetPessoas()
        {
            var json = File.ReadAllText("people.json");
            var pessoas = JsonConvert.DeserializeObject<List<Pessoa> > (json);
            return pessoas;
        }
    }    
    
}
