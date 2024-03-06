using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateProductDiscountDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public int QuantityInStock { get; set; }
        public List<int> ProductIds { get; set; }
    }
}