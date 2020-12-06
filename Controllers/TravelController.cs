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
    public class TravelController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public TravelController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/<TravelController>
        [HttpGet]
        public IEnumerable<TravelDTO> Get()
        {
            var travels = dbContext.Travels.ToList();
            var trips = dbContext.Trips.ToList();
            var tripTravelConnections = dbContext.TripTravelConnectionTable.ToList();
            var travelDTOs = new List<TravelDTO>();

            foreach (var travel in travels)
            {
                var travelDTO = new TravelDTO(travel);
                var userDTOs = GetUserDTOsByID(travel.ID);
                travelDTO.TripID = tripTravelConnections.Where(trip => trip.Travel.ID == travel.ID).FirstOrDefault().Trip.ID;
                travelDTO.Participants = userDTOs;
                travelDTOs.Add(travelDTO);
            }
            return travelDTOs;
        }

        // GET api/<TravelController>/5
        [HttpGet("{id}")]
        public TravelDTO Get(int id)
        {
            var trips = dbContext.Trips.ToList();
            var tripTravelConnections = dbContext.TripTravelConnectionTable.ToList();
            var travelDTO = new TravelDTO(dbContext.Travels.Where(travel => travel.ID == id).FirstOrDefault());
            var userDTOs = GetUserDTOsByID(id);
            if (travelDTO != null)
            {
                travelDTO.TripID = tripTravelConnections.Where(trip => trip.Travel.ID == travelDTO.ID).FirstOrDefault().Trip.ID;
                travelDTO.Participants = userDTOs;
                return travelDTO;
            }
            else
            {
                Response.StatusCode = 404;
                return new TravelDTO();
            }
            
        }

        public List<UserDTO> GetUserDTOsByID(int travelID)
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

        // POST api/<TravelController>
        [HttpPost]
        public int Post([FromBody] TravelDTO value)
        {
            var travel = new Travel();
            travel.TravelType = value.TravelType;
            travel.StartPoint = value.StartPoint;
            travel.Destination = value.Destination;
            travel.PricePerPeson = value.PricePerPeson;
            travel.Distance = value.Distance;
            travel.Consumption = value.Consumption;
            travel.FuelPrice = value.FuelPrice;
            travel.VignettePrice = value.VignettePrice;
            travel.TicketPricePerPeson = value.TicketPricePerPeson;
            travel.SeatReservationPerPerson = value.SeatReservationPerPerson;
            dbContext.Travels.Add(travel);

            var tripTravelConnection = new TripTravelConnectionTable();
            tripTravelConnection.Travel = travel;
            tripTravelConnection.Trip = dbContext.Trips.Where(trip => trip.ID == value.TripID).FirstOrDefault();
            dbContext.TripTravelConnectionTable.Add(tripTravelConnection);

            dbContext.SaveChanges();

            if (value.Participants.Count > 0)
            {
                foreach (var user in value.Participants)
                {
                    var userIdDto = new UserIdDTO();
                    userIdDto.Id = user.ID;
                    Put(travel.ID, userIdDto);
                    var tripUserCostID = dbContext.TripUserCostConnectionTable.Where(u => u.UserID == user.ID).FirstOrDefault().CostID;
                    var usersCost = dbContext.Costs.Where(c => c.ID == tripUserCostID).FirstOrDefault();
                    if (travel.TravelType == TravelType.CAR)
                    {
                        var carPricePerPerson = GetPricePerPersonIfCar(travel.Distance, travel.Consumption, travel.FuelPrice, travel.VignettePrice, value.Participants.Count);
                        usersCost.TravelCost += carPricePerPerson;
                        usersCost.TotalCost += carPricePerPerson;
                    }
                    else
                    {
                        usersCost.TravelCost += travel.TicketPricePerPeson + travel.SeatReservationPerPerson;
                        usersCost.TotalCost += travel.TicketPricePerPeson + travel.SeatReservationPerPerson;
                    }
                    dbContext.Update(usersCost);
                }
            }
            dbContext.SaveChanges();
            return travel.ID;
        }

        public double GetPricePerPersonIfCar(double destination, double consumption, double fuelPrice, double vignettePrice, int participantsNumber)
        {
            return (destination/100*consumption*fuelPrice+vignettePrice)/participantsNumber;
        }

        // PUT api/<TravelController>/5
        [HttpPut("addUser/{id}")]
        public void Put(int id, [FromBody] UserIdDTO value)
        {
            var user = dbContext.Users.Where(u => u.Id == value.Id).FirstOrDefault();
            var travel = dbContext.Travels.Where(t => t.ID == id).FirstOrDefault();
            var travelUserConnection = new UserTravelConnectionTable();
            travelUserConnection.Travel = travel;
            travelUserConnection.User = user;
            dbContext.UserTravelConnectionTable.Add(travelUserConnection);
            dbContext.SaveChanges();
        }

        // DELETE api/<TravelController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var travel = dbContext.Travels.Where(travel => travel.ID == id).FirstOrDefault();
            dbContext.Travels.Remove(travel);
            dbContext.SaveChanges();
        }
    }
}
