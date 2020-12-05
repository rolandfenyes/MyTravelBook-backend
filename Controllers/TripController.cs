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
    public class TripController : ControllerBase
    {

        private ApplicationDbContext dbContext;

        public TripController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("usersTrip/{id}")]
        public IEnumerable<TripDTO> GetUsersTrip(string id)
        {
            var users = dbContext.Users.ToList();
            var trips = dbContext.Trips.ToList();
            var usersTrip = dbContext.TripUserConnectionTable.Where(u => u.User.Id == id).ToList();
            var usersTripDTOs = new List<TripDTO>();
            foreach (var trip in usersTrip)
            {
                usersTripDTOs.Add(new TripDTO(trip.Trip));
            }
            return usersTripDTOs;
        }

        // GET: api/<TripController>
        [HttpGet]
        public IEnumerable<TripDTO> Get()
        {
            var list = dbContext.Trips.ToList();
            var organiser = dbContext.Users.ToList();
            var dtoList = new List<TripDTO>();
            foreach (var trip in list)
            {
                var tripDTO = new TripDTO(trip);
                var travelDTOs = GetTravelDTOsByID(trip.ID);
                var accommodationDTOs = GetAccommodationDTOsByID(trip.ID);
                var expenseDTOs = GetExpenseDTOsByID(trip.ID);
                var usersDTOs = GetUserDTOsByID(trip.ID);

                tripDTO.TravelDTOs = travelDTOs;
                tripDTO.AccommodationDTOs = accommodationDTOs;
                tripDTO.Expenses = expenseDTOs;
                tripDTO.Participants = usersDTOs;
                tripDTO.OrganiserName = organiser.Where(o => o.Id == tripDTO.OrganiserID).FirstOrDefault().Nickname;

                dtoList.Add(tripDTO);
            }
            return dtoList;
        }

        // GET api/<TripController>/5
        [HttpGet("{id}")]
        public TripDTO Get(int id)
        {
            var organiser = dbContext.Users.ToList();
            var trip = dbContext.Trips.Where(trip => trip.ID == id).FirstOrDefault();
            var travelDTOs = GetTravelDTOsByID(id);
            var accommodationDTOs = GetAccommodationDTOsByID(id);
            var expenseDTOs = GetExpenseDTOsByID(id);
            var usersDTOs = GetUserDTOsByID(id);
            
            if (trip != null)
            {
                var tripDTO = new TripDTO(trip);
                tripDTO.TravelDTOs = travelDTOs;
                tripDTO.AccommodationDTOs = accommodationDTOs;
                tripDTO.Expenses = expenseDTOs;
                tripDTO.Participants = usersDTOs;
                return tripDTO;
            }
            else
            {
                Response.StatusCode = 404;
                return new TripDTO();
            }
        }

        public List<TravelDTO> GetTravelDTOsByID(int tripID)
        {
            var travels = dbContext.Travels.ToList();
            var tripTravelCommunicationTable = dbContext.TripTravelConnectionTable.Where(t => t.Trip.ID == tripID).ToList();
            var travelDTOs = new List<TravelDTO>();
            

            foreach (var travel in tripTravelCommunicationTable)
            {
                var userDTOs = GetUserDTOsByTravelID(travel.ID);
                var travelDTO = new TravelDTO(dbContext.Travels.Where(t => t.ID == travel.Travel.ID).FirstOrDefault());
                travelDTO.Participants = userDTOs;
                travelDTOs.Add(travelDTO);
            }
            return travelDTOs;
        }

        public List<UserDTO> GetUserDTOsByTravelID(int travelID)
        {
            var users = dbContext.Users.ToList();
            var userTravelConnectionTable = dbContext.UserTravelConnectionTable.Where(t => t.Travel.ID == travelID).ToList();
            var userDTOs = new List<UserDTO>();
            foreach (var user in userTravelConnectionTable)
            {
                userDTOs.Add(new UserDTO(dbContext.Users.Where(u => u.Id == user.User.Id).FirstOrDefault()));
            }
            return userDTOs;
        }

        public List<AccommodationDTO> GetAccommodationDTOsByID(int tripID)
        {
            var accommodations = dbContext.Accommodations.ToList();
            var tripAccommodationCommunicationTable = dbContext.TripAccommodationConnectionTable.Where(t => t.Trip.ID == tripID).ToList();
            var accommodationDTOs = new List<AccommodationDTO>();

            foreach (var accommodation in tripAccommodationCommunicationTable)
            {
                var accommodationDTO = new AccommodationDTO(dbContext.Accommodations.Where(t => t.ID == accommodation.Accommodation.ID).FirstOrDefault());
                var userDTOs = GetUserDTOsByAccommodationID(accommodation.ID);
                accommodationDTO.Participants = userDTOs;
                accommodationDTOs.Add(accommodationDTO);
            }
            return accommodationDTOs;
        }

        public List<UserDTO> GetUserDTOsByAccommodationID(int accommodationID)
        {
            var users = dbContext.Users.ToList();
            var userAccommodationConnection = dbContext.UserAccommodationConnectionTable.Where(t => t.Accommodation.ID == accommodationID).ToList();
            var userDTOs = new List<UserDTO>();
            foreach (var user in userAccommodationConnection)
            {
                userDTOs.Add(new UserDTO(dbContext.Users.Where(u => u.Id == user.User.Id).FirstOrDefault()));
            }
            return userDTOs;
        }

        public List<ExpenseDTO> GetExpenseDTOsByID(int tripID)
        {
            var expenses = dbContext.Expenses.ToList();
            var tripExpenseCommunicationTable = dbContext.TripExpenseConnectionTable.Where(t => t.Trip.ID == tripID).ToList();
            var expenseDTOs = new List<ExpenseDTO>();


            foreach (var expense in tripExpenseCommunicationTable)
            {
                var userDTOs = GetUserDTOsByExpenseID(expense.ID);
                var expenseDTO = new ExpenseDTO(dbContext.Expenses.Where(e => e.ID == expense.Expense.ID).FirstOrDefault());
                expenseDTO.ApplicationUserDTOs = userDTOs;
                expenseDTOs.Add(expenseDTO);
            }
            return expenseDTOs;
        }

        public List<UserDTO> GetUserDTOsByExpenseID(int expenseID)
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

        public List<UserDTO> GetUserDTOsByID(int tripID)
        {
            var users = dbContext.Users.ToList();
            var tripUserConnectionTable = dbContext.TripUserConnectionTable.Where(t => t.Trip.ID == tripID).ToList();
            var userDTOs = new List<UserDTO>();
            foreach (var user in tripUserConnectionTable)
            {
                userDTOs.Add(new UserDTO(dbContext.Users.Where(u => u.Id == user.User.Id).FirstOrDefault()));
            }
            return userDTOs;
        }

        // POST api/<TripController>
        [HttpPost]
        public int Post([FromBody] TripDTO value)
        {
            var trip = new Trip();
            var organiser = dbContext.Users.Where(user => user.Id == value.OrganiserID).FirstOrDefault();
            trip.TripName = value.TripName;
            trip.StartDate = value.StartDate;
            trip.EndDate = value.EndDate;
            trip.Organiser = organiser;
            dbContext.Trips.Add(trip);
            dbContext.SaveChanges();
            var userIdDTO = new UserIdDTO();
            userIdDTO.Id = value.OrganiserID;
            Put(id: trip.ID, value: userIdDTO);
            if (value.Participants.Count > 0)
            {
                foreach (var user in value.Participants)
                {
                    var userIdDto = new UserIdDTO();
                    userIdDTO.Id = user.ID;
                    Put(trip.ID, userIdDTO);
                }
            }
            return trip.ID;
        }

        // PUT api/<TripController>/5
        [HttpPut("addUser/{id}")]
        public void Put(int id, [FromBody] UserIdDTO value)
        {
            var user = dbContext.Users.Where(u => u.Id == value.Id).FirstOrDefault();
            var trip = dbContext.Trips.Where(t => t.ID == id).FirstOrDefault();
            var tripUserConnection = new TripUserConnectionTable();
            tripUserConnection.Trip = trip;
            tripUserConnection.User = user;
            dbContext.TripUserConnectionTable.Add(tripUserConnection);
            dbContext.SaveChanges();
        }

        // DELETE api/<TripController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var trip = dbContext.Trips.Where(trip => trip.ID== id).FirstOrDefault();
            dbContext.Trips.Remove(trip);
            dbContext.SaveChanges();
        }
    }
}
