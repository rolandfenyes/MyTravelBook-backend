using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class UserExpenseConnectionTable
    {
        public int ID { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Expense Expense { get; set; }
    }
}
