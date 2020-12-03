using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravelBook.Models
{
    public class ExpenseDTO
    {
        public int ID { get; set; }
        public string ExpenseName { get; set; }
        public string Location { get; set; }
        public double Price { get; set; }
        public ExpenseType ExpenseType { get; set; }
        public List<UserDTO> ApplicationUserDTOs { get; set; }
        public int TripID { get; set; }

        public ExpenseDTO(Expense expense)
        {
            this.ID = expense.ID;
            this.ExpenseName = expense.ExpenseName;
            this.Location = expense.Location;
            this.Price = expense.Price;
            this.ExpenseType = expense.ExpenseType;
        }

        public ExpenseDTO()
        {

        }

    }
}
