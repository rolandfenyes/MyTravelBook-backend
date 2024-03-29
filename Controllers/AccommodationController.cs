﻿using System;
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
    public class AccommodationController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public AccommodationController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/<AccommodationController>
        [HttpGet]
        public IEnumerable<AccommodationDTO> Get()
        {
            var accommodations = dbContext.Accommodations.ToList();
            var trips = dbContext.Trips.ToList();
            var tripAccommodationConnections = dbContext.TripAccommodationConnectionTable.ToList();
            var accommodationDTOs = new List<AccommodationDTO>();

            foreach (var accommodation in accommodations)
            {
                var accommodationDTO = new AccommodationDTO(accommodation);
                accommodationDTO.TripID = tripAccommodationConnections.Where(trip => trip.Accommodation.ID == accommodation.ID).FirstOrDefault().Trip.ID;
                accommodationDTOs.Add(accommodationDTO);
            }
            return accommodationDTOs;
        }

        // GET api/<AccommodationController>/5
        [HttpGet("{id}")]
        public AccommodationDTO Get(int id)
        {
            var trips = dbContext.Trips.ToList();
            var tripAccommodationConnections = dbContext.TripAccommodationConnectionTable.ToList();
            var accommodationDTO = new AccommodationDTO(dbContext.Accommodations.Where(a => a.ID == id).FirstOrDefault());

            if (accommodationDTO != null) 
            { 
                accommodationDTO.TripID = tripAccommodationConnections.Where(trip => trip.Accommodation.ID == id).FirstOrDefault().Trip.ID;
                return accommodationDTO;
            }
            else
            {
                Response.StatusCode = 404;
                return new AccommodationDTO();
            }
        }

        public List<UserDTO> GetUserDTOsByID(int accommodationID)
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

        // POST api/<AccommodationController>
        [HttpPost]
        public int Post([FromBody] AccommodationDTO value)
        {
            var accommodation = new Accommodation();
            accommodation.AccommodationName = value.AccommodationName;
            accommodation.AccommodationLocation = value.AccommodationLocation;
            accommodation.AccommodationType = value.AccommodationType;
            accommodation.Nights = value.Nights;
            accommodation.Price = value.Price;
            dbContext.Accommodations.Add(accommodation);

            var tripAccommodationConnection = new TripAccommodationConnectionTable();
            tripAccommodationConnection.Accommodation = accommodation;
            tripAccommodationConnection.Trip = dbContext.Trips.Where(trip => trip.ID == value.TripID).FirstOrDefault();
            dbContext.TripAccommodationConnectionTable.Add(tripAccommodationConnection);

            dbContext.SaveChanges();

            if (value.Participants.Count > 0)
            {
                foreach (var user in value.Participants)
                {
                    var userIdDto = new UserIdDTO();
                    userIdDto.Id = user.ID;
                    Put(accommodation.ID, userIdDto);
                    var costsOfTrip = dbContext.TripUserCostConnectionTable.Where(t => t.TripID == value.TripID).ToList();

                    var userCostId = costsOfTrip.Where(t => t.UserID == user.ID).FirstOrDefault().CostID;
                    var usersCost = dbContext.Costs.Where(c => c.ID == userCostId).FirstOrDefault();
                    usersCost.AccommodationCost += accommodation.Price;
                    usersCost.TotalCost += accommodation.Price;
                    
                    dbContext.Update(usersCost);
                }
            }
            dbContext.SaveChanges();
            return accommodation.ID;
        }

        // PUT api/<AccommodationController>/5
        [HttpPut("addUser/{id}")]
        public void Put(int id, [FromBody] UserIdDTO value)
        {
            var user = dbContext.Users.Where(u => u.Id == value.Id).FirstOrDefault();
            var accommodation = dbContext.Accommodations.Where(t => t.ID == id).FirstOrDefault();
            var userAccommodationConnection = new UserAccommodationConnectionTable();
            userAccommodationConnection.Accommodation = accommodation;
            userAccommodationConnection.User = user;
            dbContext.UserAccommodationConnectionTable.Add(userAccommodationConnection);
            dbContext.SaveChanges();
        }

        // DELETE api/<AccommodationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var accommodation = dbContext.Accommodations.Where(accommodation => accommodation.ID == id).FirstOrDefault();
            dbContext.Accommodations.Remove(accommodation);
            dbContext.SaveChanges();
        }
    }
}
