using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> UserManager)
        {
            if(!UserManager.Users.Any()){
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName ="Bob",
                        LastName = "Bobbity",
                        Street = "10th Street",
                        City = "New York",
                        State = "Ny",
                        ZipCode = "90210"
                    }
                };
                await UserManager.CreateAsync(user,"Pa$$w0rd");
            }
        }
    }
}