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

        public int TripID { get; set; }

        public TravelDTO(Travel travel)
        {
            ID = travel.ID;
            TravelType = travel.TravelType;
            StartPoint = travel.StartPoint;
            Destination = travel.Destination;
            PricePerPeson = travel.PricePerPeson;
            // Participants = 
            Distance = travel.Distance;
            Consumption = travel.Consumption;
            FuelPrice = travel.FuelPrice;
            VignettePrice = travel.VignettePrice;
            TicketPricePerPeson = travel.TicketPricePerPeson;
            SeatReservationPerPerson = travel.SeatReservationPerPerson;
        }

        public TravelDTO()
        {

        }
    }
}
