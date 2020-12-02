using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class UserAccommodationConnectionTable
    {
        public int ID { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Accommodation Accommodation { get; set; }
}
}
