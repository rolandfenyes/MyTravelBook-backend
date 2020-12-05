using MyTravelBook.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyTravelBook.Models.ConnectionTables;

namespace MyTravelBook.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {

        }
        public DbSet<FriendshipConnectionTable> FriendshipConnectionTable { get; set; }
        public DbSet<TripAccommodationConnectionTable> TripAccommodationConnectionTable { get; set; }
        public DbSet<TripExpenseConnectionTable> TripExpenseConnectionTable { get; set; }
        public DbSet<TripTravelConnectionTable> TripTravelConnectionTable { get; set; }
        public DbSet<UserAccommodationConnectionTable> UserAccommodationConnectionTable { get; set; }
        public DbSet<UserExpenseConnectionTable> UserExpenseConnectionTable { get; set; }
        public DbSet<UserTravelConnectionTable> UserTravelConnectionTable { get; set; }
        public DbSet<TripUserConnectionTable> TripUserConnectionTable { get; set; }
        public DbSet<TripUserCostConnectionTable> TripUserCostConnectionTable { get; set; }

        public DbSet<Trip> Trips { get; set; }
        public DbSet<Travel> Travels { get; set; }
        public DbSet<Accommodation> Accommodations { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Cost> Costs { get; set; }

    }
}
