using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using System.Data.SqlTypes;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(
            IGenericRepository<Product> productsRepo,
        IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo,
        IMapper mapper)
        {
            _productsRepo = productsRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }
   
    [HttpGet]
    public  async Task<ActionResult<IReadOnlyList<ProductsToReturnDto>>> GetProducts(
        string? sort,int? brandId,int? TypeId) 
    {
       
        var spec = new ProductsWithTypesAndBrandsSpecification(sort,brandId,TypeId);


        var products = await _productsRepo.ListAsync(spec);

        return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductsToReturnDto>>(products));
    } 


    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductsToReturnDto>> GetProduct(int id) 
    {
        var spec = new ProductsWithTypesAndBrandsSpecification(id);

        var product = await _productsRepo.GetEntityWithSpec(spec);

        if(product == null) return NotFound(new ApiResponse(404));
        return _mapper.Map<Product, ProductsToReturnDto>(product);

       
    }


    [HttpGet]
    [Route("/productBrand")]
      public async Task<ActionResult<ProductBrand>> GetProductBrand() 
    {
        var productbrand = await _productBrandRepo.ListAllAsync();
        return Ok(productbrand);
    }
    [HttpGet]
    [Route("/productTypes")]
    public async Task<ActionResult<ProductType>>  GetProductTypes()
    {
        var productType = await _productTypeRepo.ListAllAsync();
        return Ok(productType);
    }

}
    
}