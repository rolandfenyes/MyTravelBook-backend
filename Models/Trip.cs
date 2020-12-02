using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class Trip
    {
        public string tripName;
        public DateTime startDate;
        public DateTime endDate;
        public List<Travel> travels;
        public List<Accommoddation> accommoddations;
        public List<Expenses> outgoings;
        public ApplicationUser organiser;
    }
}
