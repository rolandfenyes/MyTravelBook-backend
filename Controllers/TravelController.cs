using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTravelBook.Data;
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
                travelDTO.TripID = tripTravelConnections.Where(trip => trip.Travel.ID == travel.ID).FirstOrDefault().Trip.ID;
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
            if (travelDTO != null)
            {
                travelDTO.TripID = tripTravelConnections.Where(trip => trip.Travel.ID == travelDTO.ID).FirstOrDefault().Trip.ID;
                return travelDTO;
            }
            else
            {
                Response.StatusCode = 404;
                return new TravelDTO();
            }
            
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
            travel.Destination = value.Destination;
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
            return travel.ID;
        }

        // PUT api/<TravelController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
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
