using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class Travel
    {
        public TravelType travelType;
        public string startPoint;
        public string destination;
        public List<ApplicationUser> participants;
        public double pricePerPeson;

        //CAR
        public double distance;
        public double consumption;
        public double fuelPrice;
        public double vignettePrice;

        //Public transport
        public double ticketPricePerPeson;
        public double seatReservationPerPerson;
    }
}
