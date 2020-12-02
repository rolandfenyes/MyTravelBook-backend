using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models.ConnectionTables
{
    public class TripAccommodationConnectionTable
    {
        public int ID { get; set; }
        public virtual Trip Trip { get; set; }
        public virtual Accommodation Accommodation { get; set; }
    }
}
