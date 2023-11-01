using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAgregate;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        public IGenericRepository<Order> _orderRepo { get; }
        public IGenericRepository<DeliveryMethod> _dmRepo { get; set; }
        public IGenericRepository<Product> _productRepo { get; }
        public IBasketRepository _basketRepo { get; }
        public OrderService(IGenericRepository<Order> orderRepo,IGenericRepository<DeliveryMethod> dmRepo,IGenericRepository<Product> productRepo,IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
            _productRepo= productRepo;
            _dmRepo = dmRepo;
            _orderRepo = orderRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from repo we dont trust whats in the basket but what is in the database
            var basket = await _basketRepo.GetBasketAsync(basketId);
            //get items from product repo
            var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem =  await _productRepo.GetByIdAsync(item.Id);
                var itemOrderd = new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrderd,productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            
            //get delivery method
            var deliveryMethod = await _dmRepo.GetByIdAsync(deliveryMethodId);
            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            //create order
            var order = new Order(items,buyerEmail,shippingAddress,deliveryMethod,subtotal);
            //save to db

            //return order
            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}