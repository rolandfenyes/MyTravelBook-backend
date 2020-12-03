using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTravelBook.Data;
using MyTravelBook.DTO;
using MyTravelBook.Models;
using MyTravelBook.Models.ConnectionTables;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyTravelBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public ExpenseController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/<ExpenseController>
        [HttpGet]
        public IEnumerable<ExpenseDTO> Get()
        {
            var expenses = dbContext.Expenses.ToList();
            var trips = dbContext.Trips.ToList();
            var tripExpenseConnections = dbContext.TripExpenseConnectionTable.ToList();
            var expenseDTOs = new List<ExpenseDTO>();

            foreach (var expense in expenses)
            {
                var expenseDTO = new ExpenseDTO(expense);
                var userDTOs = GetUserDTOsByID(expense.ID);
                expenseDTO.TripID = tripExpenseConnections.Where(e => e.Expense.ID == expense.ID).FirstOrDefault().Trip.ID;
                expenseDTO.ApplicationUserDTOs = userDTOs;
                expenseDTOs.Add(expenseDTO);
            }
            return expenseDTOs;
        }

        // GET api/<ExpenseController>/5
        [HttpGet("{id}")]
        public ExpenseDTO Get(int id)
        {
            var expenses = dbContext.Expenses.ToList();
            var tripExpenseConnections = dbContext.TripExpenseConnectionTable.ToList();
            var expenseDTO = new ExpenseDTO(dbContext.Expenses.Where(e=> e.ID == id).FirstOrDefault());
            var userDTOs = GetUserDTOsByID(id);
            if (expenseDTO != null)
            {
                expenseDTO.TripID = tripExpenseConnections.Where(trip => trip.Expense.ID == expenseDTO.ID).FirstOrDefault().Trip.ID;
                expenseDTO.ApplicationUserDTOs = userDTOs;
                return expenseDTO;
            }
            else
            {
                Response.StatusCode = 404;
                return new ExpenseDTO();
            }

        }

        public List<UserDTO> GetUserDTOsByID(int expenseID)
        {
            var users = dbContext.Users.ToList();
            var userExpenseConnectionTable = dbContext.UserExpenseConnectionTable.Where(e => e.Expense.ID == expenseID).ToList();
            var userDTOs = new List<UserDTO>();
            foreach (var user in userExpenseConnectionTable)
            {
                userDTOs.Add(new UserDTO(dbContext.Users.Where(u => u.Id == user.User.Id).FirstOrDefault()));
            }
            return userDTOs;
        }

        // POST api/<ExpenseController>
        [HttpPost]
        public int Post([FromBody] ExpenseDTO value)
        {
            var expense = new Expense();
            expense.ExpenseName = value.ExpenseName;
            expense.ExpenseType = value.ExpenseType;
            expense.Location = value.Location;
            expense.Price = value.Price;
            dbContext.Expenses.Add(expense);

            var tripExpenseConnection = new TripExpenseConnectionTable();
            tripExpenseConnection.Expense = expense;
            tripExpenseConnection.Trip = dbContext.Trips.Where(trip => trip.ID == value.TripID).FirstOrDefault();
            dbContext.TripExpenseConnectionTable.Add(tripExpenseConnection);

            dbContext.SaveChanges();
            return expense.ID;
        }

        // PUT api/<ExpenseController>/5
        [HttpPut("addUser/{id}")]
        public void Put(int id, [FromBody] UserIdDTO value)
        {
            var user = dbContext.Users.Where(u => u.Id == value.Id).FirstOrDefault();
            var expense = dbContext.Expenses.Where(t => t.ID == id).FirstOrDefault();
            var userExpenseConnection = new UserExpenseConnectionTable();
            userExpenseConnection.Expense = expense;
            userExpenseConnection.User = user;
            dbContext.UserExpenseConnectionTable.Add(userExpenseConnection);
            dbContext.SaveChanges();
        }

        // DELETE api/<ExpenseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var expense = dbContext.Expenses.Where(e => e.ID == id).FirstOrDefault();
            dbContext.Expenses.Remove(expense);
            dbContext.SaveChanges();
        }
    }
}
