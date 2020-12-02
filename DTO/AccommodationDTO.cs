using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class AccommodationDTO
    {
        public int ID { get; set; }
        public string AccommodationName { get; set; }
        public string AccommodationLocation { get; set; }
        public int Nights { get; set; }
        public AccommodationType AccommodationType { get; set; }
        public double Price { get; set; }
        public List<ApplicationUserDTO> Participants { get; set; }
    }
}
