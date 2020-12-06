using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Nickname { get; set; }
        public DateTime Birth { get; set; }
        public ApplicationUser() : base()
        {
            this.EmailConfirmed = true;
        }
    }
}
