using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ShoppingCartDto
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<ShoppingCartItemDto> Items { get; set; }
    }
}