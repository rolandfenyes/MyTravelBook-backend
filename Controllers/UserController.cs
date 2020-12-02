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
    public class UserController : ControllerBase
    {

        private ApplicationDbContext dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<UserDTO> Get()
        {
            var list =  dbContext.Users.ToArray();
            var dtoList = new List<UserDTO>();
            foreach (var user in list)
            {
                dtoList.Add(new UserDTO(user));
            }
            return dtoList;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public UserDTO Get(string id)
        {
            return new UserDTO(dbContext.Users.Where(user => user.Id == id).FirstOrDefault());
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] UserDTO value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            var user = dbContext.Users.Where(user => user.Id == id).FirstOrDefault();
            dbContext.Users.Remove(user);
            dbContext.SaveChanges();
        }
    }
}
