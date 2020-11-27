using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SistemaTeste2.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the AppIdentityUser class
    public class AppIdentityUser : IdentityUser
    {
        public AppIdentityUser() : base()
        {
        }

        public AppIdentityUser(string userName) : base(userName)
        {
        }

        //informações que devem ter no usuário
        public string Name { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public string Dia { get; set; }
        public string Mes { get; set; }
        public string Ano { get; set; }
        public string Password { get; set; }
        public string Photo { get; set; }


    }
}
