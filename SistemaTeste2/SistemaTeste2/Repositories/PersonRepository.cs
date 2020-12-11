using CasaDoCodigo.Repositories;
using SistemaTeste2.Models;
using System.Collections.Generic;
using System.Linq;
using static SistemaTeste2.Repositories.PersonRepository;

namespace SistemaTeste2.Repositories
{
    public interface IPersonRepository
    {
        //void SavePessoas(List<PersonRepository.Pessoa> pessoas);
        IList<Person> GetPeople();
        bool ExistsPeoples();
        Person UpdatePessoas(Person person);
        void SavePessoas(List<Pessoa> pessoas);
        void AddPessoa(Person person);
        void DeletePessoa(int id);
    }

    public class PersonRepository : BaseRepository<Person>, IPersonRepository
    {
        //private readonly ApplicationContext contexto;
        public PersonRepository(ApplicationContext contexto) : base(contexto)
        {
        }

        public void AddPessoa(Person p)
        {
            contexto.People.Add(new Person(p.Name, p.Role, p.Status, p.Password, p.Email, p.Dia, p.Mes, p.Ano, p.Photo));
            contexto.SaveChanges();
        }

        public void DeletePessoa(int id)
        {
            var pessoas = GetPeople();
            //pega a pessoa cujo id é igual ao passado e remove ela
            contexto.Remove(pessoas.Where(p => p.Id == id).SingleOrDefault());
            contexto.SaveChanges();
        }

        public bool ExistsPeoples()
        {
            //duas formas de fazer: usando o contexto.Set<Person>().ToList()
            //ou pegando o People que dá acesso direto ao banco de dados
           return contexto.People.Count() > 0;
        }

        public IList<Person> GetPeople()
        {
            return contexto.Set<Person>().ToList();
        }

        public void SavePessoas(List<Pessoa> pessoas)
        {
            foreach (var p in pessoas)
            {
                contexto.People.Add(new Person(p.Name, p.Role, p.Status, p.Password, p.Email, p.Dia, p.Mes, p.Ano, p.Photo));
            }
            contexto.SaveChanges();
        }

        public Person UpdatePessoas(Person person)
        {
            //acha a pessoa cujo id é igual ao que estamos passando
            var personDB = dbSet.Where(p => p.Id == person.Id)
                                .SingleOrDefault(); //pega o primeiro valor ou deixa null
            var pessoasAntesAtualizacao = new Person();
            pessoasAntesAtualizacao.Email = personDB.Email;
            pessoasAntesAtualizacao.Password = personDB.Password;

            if(personDB != null)
            {
                //passa a pessoa pra atualizar
                personDB.AtualizaPessoa(person, personDB);

                contexto.SaveChanges();
            }
            return pessoasAntesAtualizacao;
        }

        public class Pessoa
        {
            public string Codigo { get; set; }
            public string Name { get; set; }
            public string Role { get; set; }
            public string Status { get; set; }
            public string Dia { get; set; }
            public string Mes { get; set; }
            public string Ano { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public string Photo { get; set; }
        }
    }
}
