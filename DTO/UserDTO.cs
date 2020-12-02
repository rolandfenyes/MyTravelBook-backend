using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class UserDTO
    {
        public string ID { get; set; }
        public string Nickname { get; set; }
        public DateTime Birth { get; set; }

        public UserDTO(ApplicationUser applicationUser)
        {
            this.ID = applicationUser.Id;
            this.Nickname = (applicationUser.Nickname != null) ? applicationUser.Nickname : "nickname";
            this.Birth = (applicationUser.Birth != null) ? applicationUser.Birth : new DateTime();
        }

        public UserDTO()
        {

        }

       }
}
