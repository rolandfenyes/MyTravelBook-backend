using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class Accommodation
    {
        public string accommodationName;
        public string accommodationLocation;
        public int nights;
        public AccommodationType accommodationType;
        public List<ApplicationUser> participants;
        public double price;
    }
}
