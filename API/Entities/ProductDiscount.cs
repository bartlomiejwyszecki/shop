using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProductDiscount
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public int QuantityInStock { get; set; }
        public List<ProductProductDiscount> ProductProductDiscounts { get; set; }
    }
}