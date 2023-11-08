using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAgregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http.HttpResults;

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
            //check order alreadey exists
             var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
             var order = await _unitofwork.Repository<Order>().GetEntityWithSpec(spec);
            if(order != null)
            {
                order.ShipToAddress = shippingAddress;
                 order.ShipToAddress = shippingAddress;
                order.DeliveryMethod = deliveryMethod;
                order.Subtotal = subtotal;
                _unitofwork.Repository<Order>().Update(order);
            }
            else 
            {
                order = new Order(items,buyerEmail,shippingAddress,deliveryMethod,subtotal,basket.PaymentIntentId);
                _unitofwork.Repository<Order>().Add(order);
            }

            // //if successful you need to delete basket
            // await _basketRepo.DeleteBasketAsync(basketId);

            var result = await _unitofwork.Complete();
            if (result <= 0) return null;

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return _unitofwork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemAndOrderingSpecifications(id,buyerEmail);
            return await _unitofwork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
           var spec = new OrdersWithItemAndOrderingSpecifications(buyerEmail );

           return await _unitofwork.Repository<Order>().ListAsync(spec);

        }
    }
}