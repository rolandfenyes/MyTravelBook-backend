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
                var usersDTOs = GetUserDTOsByID(trip.ID);

                tripDTO.TravelDTOs = travelDTOs;
                tripDTO.AccommodationDTOs = accommodationDTOs;
                tripDTO.Participants = usersDTOs;

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
            var usersDTOs = GetUserDTOsByID(id);
            
            if (trip != null)
            {
                var tripDTO = new TripDTO(trip);
                tripDTO.TravelDTOs = travelDTOs;
                tripDTO.AccommodationDTOs = accommodationDTOs;
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
                travelDTOs.Add(new TravelDTO(dbContext.Travels.Where(t => t.ID == travel.Travel.ID).FirstOrDefault()));
            }
            return travelDTOs;
        }

        public List<AccommodationDTO> GetAccommodationDTOsByID(int tripID)
        {
            var accommodations = dbContext.Accommodations.ToList();
            var tripAccommodationCommunicationTable = dbContext.TripAccommodationConnectionTable.Where(t => t.Trip.ID == tripID).ToList();
            var accommodationDTOs = new List<AccommodationDTO>();

            foreach (var accommodation in tripAccommodationCommunicationTable)
            {
                accommodationDTOs.Add(new AccommodationDTO(dbContext.Accommodations.Where(t => t.ID == accommodation.Accommodation.ID).FirstOrDefault()));
            }
            return accommodationDTOs;
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
            return trip.ID;
        }

        // PUT api/<TripController>/5
        [HttpPut("addUserToTrip/{id}")]
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
