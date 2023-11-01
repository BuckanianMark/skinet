using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductsToReturnDto 
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public required string Description { get; set; }

        public decimal Price { get; set; }

        public required string PictureUrl { get; set; }

        public required string ProductType { get; set; }

        public required string ProductBrand { get; set; }

    }
}