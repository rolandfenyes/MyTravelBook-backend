using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class TripDTO
    {
        public int ID { get; set; }
        public string TripName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string OrganiserID { get; set; }
        public List<TravelDTO> TravelDTOs { get; set; }
        public List<AccommodationDTO> AccommodationDTOs { get; set; }
        public List<UserDTO> Participants { get; set; }
        public List<ExpenseDTO> Expenses { get; set; }

        public TripDTO(Trip trip)
        {
            this.ID = trip.ID;
            this.TripName = trip.TripName;
            this.StartDate = trip.StartDate;
            this.EndDate = trip.EndDate;
            this.OrganiserID = (trip.Organiser != null) ? trip.Organiser.Id : "null";
        }
        public TripDTO()
        {

        }
    }
}
