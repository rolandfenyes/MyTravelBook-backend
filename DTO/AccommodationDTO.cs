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
        public List<UserDTO> Participants { get; set; }
        public int TripID { get; set; }

        public AccommodationDTO(Accommodation accommodation)
        {
            this.ID = accommodation.ID;
            this.AccommodationName = accommodation.AccommodationName;
            this.AccommodationLocation = accommodation.AccommodationLocation;
            this.Nights = accommodation.Nights;
            this.AccommodationType = accommodation.AccommodationType;
            this.Price = accommodation.Price;
        }

        public AccommodationDTO()
        {

        }
    }
}
