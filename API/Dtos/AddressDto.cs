using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AddressDto
    {
       
        public required string FirstName { get; set; }
       
        public required   string LastName { get; set; }
      
        public required   string City { get; set; }
       
        public required  string Street { get; set; }
        
        public required  string State { get; set; }
         
        public required   string ZipCode { get; set; }
    }
}