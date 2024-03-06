using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProductProductDiscount
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public Guid ProductDiscountId { get; set; }
        public ProductDiscount ProductDiscount { get; set; }
    }
}