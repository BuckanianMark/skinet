using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Core.Entities.OrderAgregate
{
    public enum OrderStatus 
    {
        [EnumMember(Value = "Pending")]
       Pending,
       [EnumMember(Value = "Payment Recieved")]
       PaymentRecieved,
       [EnumMember(Value = "Payment Failed")]
       PaymentFailed 
    }
    
}