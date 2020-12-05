using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class Cost
    {
        public int ID { get; set; }
        public double TravelCost { get; set; }
        public double AccommodationCost { get; set; }
        public double ExpenseCost { get; set; }
        public double TotalCost { get; set; }
    }
}
