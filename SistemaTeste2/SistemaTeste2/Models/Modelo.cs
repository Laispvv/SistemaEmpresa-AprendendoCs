using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace SistemaTeste2.Models
{
    [DataContract]
    public abstract class BaseModel
    {
        [DataMember]
        public int Id { get; protected set; }
    }
    [DataContract]
    public class Person : BaseModel
    {
        public Person()
        {

        }
        [Required]
        [DataMember]
        public string Name { get; set; }
        [Required]
        [DataMember]
        public string Role { get; set; }
        [Required]
        [DataMember]
        public string Status { get; set; }
        [Required]
        [DataMember]
        public string Dia { get; set; }
        [Required]
        [DataMember]
        public string Mes { get; set; }
        [Required]
        [DataMember]
        public string Ano { get; set; }
        [Required]
        [DataMember]
        public string Password { get; set; }
        [Required]
        [DataMember]
        public string Photo { get; set; }
        //[Required]
        [DataMember]
        public Sistema Sistema { get; private set; }

        public Person(string name, string role, string status, string password, string dia, string mes, string ano, string photo)
        {
            Name = name;
            Role = role;
            Status = status;
            Password = password;
            Dia = dia;
            Mes = mes;
            Ano = ano;
            Photo = photo;
        }
        public override string ToString()
        {
            return $"{Name},{Role},{Status},{Dia},{Mes},{Ano}";
        }
        public string StatusIconObj()
        {
            if (Status == "Active")
            {
                return "#6ed659"; //green
            }
            else if (Status == "Inactive")
            {
                return "#d6d459"; //yellow
            }
            else return "#dd405a"; //red
        }

        internal void AtualizaPessoa(Person person, Person person1)
        {
            //recebe uma pessoa pra atualizar, agora devemos ver
            //quais valores não são nulos e devem ser de fato atualizados
            if (person.Name != "") person1.Name = person.Name;
            if (person.Password != "") person1.Password = person.Password;
            if (person.Photo != "" && person.Photo != null) person1.Photo = person.Photo;
            if (person.Status != "0") person1.Status = person.Status;
            if (person.Role != "") person1.Role = person.Role;
            if (person.Dia != "0") person1.Dia = person.Dia;
            if (person.Mes != "0") person1.Mes = person.Mes;
            if (person.Ano != "0") person1.Ano = person.Ano;
        }

    }
    public class Login
    {
        public Login()
        {
        }
        public string User { get; set; }
        public string Password { get; set; }

        public Login(string user, string password)
        {
            User = user;
            Password = password;
        }
    }

    public class Sistema : BaseModel
    {
        public Sistema()
        {
        }
        public List<Person> People { get; private set; } = new List<Person>();

        public Sistema(List<Person> people)
        {
            People = people;
        }

        public static Person AddPerson()
        {
            Person p = null;
            return p;
        }

        public static void ExportToExcel()
        {
            //logica para exportar para o excel
        }
        public static void ConfigurePerson(Person p)
        {
            //logica para alterar dados da pessoa
        }
    }
}
