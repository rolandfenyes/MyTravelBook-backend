using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class TravelDTO
    {
        public int ID { get; set; }
        public TravelType TravelType { get; set; }
        public string StartPoint { get; set; }
        public string Destination { get; set; }
        public double PricePerPeson { get; set; }
        public List<UserDTO> Participants { get; set; }

        //CAR
        public double Distance { get; set; }
        public double Consumption { get; set; }
        public double FuelPrice { get; set; }
        public double VignettePrice { get; set; }

        //Public transport
        public double TicketPricePerPeson { get; set; }
        public double SeatReservationPerPerson { get; set; }
    }
}
