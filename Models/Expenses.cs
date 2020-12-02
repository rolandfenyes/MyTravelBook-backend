using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class Expenses
    {
        public string outgoingName;
        public string location;
        public double price;
        public List<ApplicationUser> participants;
        public ExpenseType outgoingType;
    }
}
