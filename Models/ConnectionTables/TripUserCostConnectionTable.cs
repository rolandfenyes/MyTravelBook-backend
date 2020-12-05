using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models.ConnectionTables
{
    public class TripUserCostConnectionTable
    {
        public int ID { get; set; }
        public virtual string UserID { get; set; }
        public virtual int TripID { get; set; }
        public virtual int CostID { get; set; }
    }
}
