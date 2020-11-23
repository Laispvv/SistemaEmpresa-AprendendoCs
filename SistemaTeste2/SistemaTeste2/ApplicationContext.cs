using Microsoft.EntityFrameworkCore;
using SistemaTeste2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaTeste2
{
    //classe para usar o banco de dados
    public class ApplicationContext : DbContext
    {
        //construtor gerado com o parâmetro options
        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }
        //quando estiver criando o modelo de banco ele acessa esse método
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().HasKey(t => t.Id);
            modelBuilder.Entity<Sistema>().HasKey(t => t.Id);
            modelBuilder.Entity<Sistema>().HasMany(t => t.People).WithOne(t => t.Sistema);
        }

        public  DbSet<Person> People { get; set; }
        public  DbSet<Sistema> Systems { get; set; }
    }
}
