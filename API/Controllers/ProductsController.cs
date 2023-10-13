using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        
        public readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
            
        }
   
     [HttpGet]
    public  async Task<ActionResult<List<Product>>> GetProducts() 
    {
        var products = await _repo.GetProductsAsync();
        return Ok(products);
    } 
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id) 
    {
        var product = await _repo.GetProductByIdAsync(id);
        return Ok(product);
    }

    [HttpGet]
    [Route("/productBrand")]
      public async Task<ActionResult<ProductBrand>> GetProductBrand() 
    {
        var productbrand = await _repo.GetProductBrand();
        return Ok(productbrand);
    }
    [HttpGet]
    [Route("/productTypes")]
    public async Task<ActionResult<ProductType>>  GetProductTypes()
    {
        var productType = await _repo.GetProductTypes();
        return Ok(productType);
    }

}
    
}