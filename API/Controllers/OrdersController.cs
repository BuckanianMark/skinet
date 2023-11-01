using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAgregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        public readonly IOrderService _orderService;
        public readonly IMapper _mapper;
        public OrdersController(IOrderService orderService,IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderdto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var address = _mapper.Map<AddressDto, Address>(orderdto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email,orderdto.DeliveryMethodId,orderdto.BasketId,address);

            if(order == null) BadRequest(new ApiResponse(400,"Problem creating order!"));

            return Ok(order);
        }
    }
}