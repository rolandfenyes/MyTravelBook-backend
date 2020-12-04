using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyTravelBook.Data;
using MyTravelBook.DTO;
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

        // GET api/<UserController>/friends/5
        [HttpGet("friends/{id}")]
        public List<UserDTO> GetFriends(string id)
        {
            var users = dbContext.Users.ToList();
            var friends = dbContext.FriendshipConnectionTable.Where(f => f.User.Id == id).ToList();
            var userDTOs = new List<UserDTO>();

            foreach (var friend in friends)
            {
                var userDTO = new UserDTO(friend.Friend);
                userDTOs.Add(userDTO);
            }

            return userDTOs;
        }

        [HttpGet("getCurrentUserId")]
        [Authorize]
        public UserIdDTO GetCurrentUserId()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userIdDTO = new UserIdDTO();
            userIdDTO.Id = id;
            return userIdDTO;
        }

        // PUT api/<UserController>/addFriend/5
        [HttpPut("addFriend/{id}")]
        public void Put(string id, [FromBody] UserIdDTO value)
        {
            var friendshipConnection = new FriendshipConnectionTable();
            var friendshipConnection2 = new FriendshipConnectionTable();
            var user = dbContext.Users.Where(u => u.Id == id).FirstOrDefault();
            var friend = dbContext.Users.Where(f => f.Id == value.Id).FirstOrDefault();
            friendshipConnection.User = user;
            friendshipConnection.Friend = friend;

            friendshipConnection2.User = friend;
            friendshipConnection2.Friend = user;
            dbContext.FriendshipConnectionTable.Add(friendshipConnection);
            dbContext.FriendshipConnectionTable.Add(friendshipConnection2);
            dbContext.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody] UserDTO value)
        {
            var user = dbContext.Users.Where(u => u.Id == id).FirstOrDefault();
            user.Nickname = value.Nickname;
            user.Birth = value.Birth;
            dbContext.Users.Update(user);
            dbContext.SaveChanges();
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
