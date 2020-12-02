using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTravelBook.Data;
using MyTravelBook.Models;

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
                dtoList.Add(new TripDTO(trip));
            }
            return dtoList;
        }

        // GET api/<TripController>/5
        [HttpGet("{id}")]
        public TripDTO Get(int id)
        {
            var organiser = dbContext.Users.ToList();
            var trip = dbContext.Trips.Where(trip => trip.ID == id).FirstOrDefault();
            if (trip != null)
            {
                return new TripDTO(trip);
            }
            else
            {
                Response.StatusCode = 404;
                return new TripDTO();
            }
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
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TripDTO value)
        {

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
