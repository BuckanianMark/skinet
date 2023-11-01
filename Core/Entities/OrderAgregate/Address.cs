using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAgregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string firstName,string lastName,string street,string state,string city,string zipcode)
        {
            FirstName = firstName;
            LastName  = lastName;
            ZipCode = zipcode;
            Street = street;
            State = state;
            City = city;

        }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? City { get; set; }

        public string? Street { get; set; }

        public string? State { get; set; }

        public string? ZipCode { get; set; } 
    }
}