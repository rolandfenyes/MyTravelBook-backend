using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class ApplicationUserDTO : IdentityUser
    {
        public long ID { get; set; }
        public string Nickname { get; set; }
        public DateTime Birth { get; set; }
    }
}
