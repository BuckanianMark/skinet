using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        public required string  Id { get; set; }

        public List<BasketItemDto> Items{ get; set; }
        
    }
}