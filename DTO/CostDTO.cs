using MyTravelBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.DTO
{
    public class CostDTO
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public double TravelCost { get; set; }
        public double AccommodationCost { get; set; }
        public double ExpenseCost { get; set; }
        public double TotalCost { get; set; }

        public CostDTO(Cost cost, string userID)
        {
            this.ID = cost.ID;
            this.UserID = userID;
            this.TravelCost = cost.TravelCost;
            this.AccommodationCost = cost.AccommodationCost;
            this.ExpenseCost = cost.ExpenseCost;
            this.TotalCost = cost.TotalCost;
        }

        public CostDTO() { }

    }
}
