using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class BasketItemDto
    {
        public int Id { get; set; }

        public required  string ProductName { get; set; }
        [Range(0.1,double.MaxValue,ErrorMessage = "Price must be greater than zero")]
        public required decimal Price { get; set; }

        public required string PictureUrl { get; set; }
        [Range(1,double.MaxValue,ErrorMessage = "Quantity must be atleast 1")]
        public required int Quantity { get; set; }

        public required string Brand { get; set; }

        public required string Type { get; set; }
    }
}