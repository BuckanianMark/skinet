using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities.OrderAgregate;

namespace Core.Specifications
{
    public class OrdersWithItemAndOrderingSpecifications : BaseSpecification<Order>
    {
        public OrdersWithItemAndOrderingSpecifications(string email):base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);

        }

        public OrdersWithItemAndOrderingSpecifications(int id,string email) 
        : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}