using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Core.Entities.OrderAgregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(Address shipToAdress, decimal subtotal,string buyerEmail,IReadOnlyList<OrderItem> orderItems,DeliveryMethod deliveryMethod)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAdress;
            Subtotal = subtotal;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
        }

        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress{ get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public decimal GetTotal() { 
            return Subtotal + DeliveryMethod.Price;
         }
    }
}