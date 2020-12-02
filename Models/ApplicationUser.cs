using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string nickname;
        public DateTime birth;
        public List<Trip> myTrips;
        public List<ApplicationUser> friendsList;
    }
}
