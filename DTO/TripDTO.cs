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
        public ApplicationUser Organiser { get; set; }
        public List<TravelDTO> TravelDTOs { get; set; }
        public List<ApplicationUserDTO> Participants { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}
