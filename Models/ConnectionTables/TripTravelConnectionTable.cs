using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models.ConnectionTables
{
    public class TripTravelConnectionTable
    {
        public int ID { get; set; }
        public virtual Trip Trip { get; set; }
        public virtual Travel Travel { get; set; }
    }
}
