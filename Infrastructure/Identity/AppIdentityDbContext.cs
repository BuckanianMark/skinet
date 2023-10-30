using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContext: IdentityDbContext<AppUser>
    {
       public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options):base(options) 
       {
       }
   
    public DbSet<Address> Addresses {get; set;}
    public DbSet<AppUser> AppUsers {get; set;}

      protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
     
    }
}