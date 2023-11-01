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
       
        public IUnitOfWork _unitofwork { get; }
        public IBasketRepository _basketRepo { get; }
        public OrderService(IUnitOfWork unitOfWork,
        IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
            _unitofwork = unitOfWork;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from repo we dont trust whats in the basket but what is in the database
            var basket = await _basketRepo.GetBasketAsync(basketId);
            //get items from product repo
            var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem =  await _unitofwork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrderd = new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrderd,item.Quantity,productItem.Price);
                items.Add(orderItem);
            }
            
            //get delivery method
            var deliveryMethod = await _unitofwork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            //create order
            var order = new Order(shippingAddress,subtotal,buyerEmail,items,deliveryMethod);
            
            _unitofwork.Repository<Order>().Add(order);
            //save to db
            var result = await _unitofwork.Complete();
            if(result <= 0) return null;

            //if successful you need to delete basket
            await _basketRepo.DeleteBasketAsync(basketId);

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