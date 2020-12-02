using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class Expense
    {
        public int ID { get; set; }
        public string ExpenseName { get; set; }
        public string Location { get; set; }
        public double Price { get; set; }
        public ExpenseType ExpenseType { get; set; }
    }
}
