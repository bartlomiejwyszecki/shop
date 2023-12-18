using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ShoppingCartController : BaseApiController
    {
        private readonly ILogger<ShoppingCartController> _logger;
        private readonly StoreContext _context;

        public ShoppingCartController(StoreContext context, ILogger<ShoppingCartController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart()
        {
            var shoppingCart = await _context.ShoppingCarts
                .Include(item => item.Items)
                .ThenInclude(product => product.Product)
                .FirstOrDefaultAsync(x => x.CustomerId == Request.Cookies["customerId"]);
            
            if (shoppingCart == null) return NotFound();

            return shoppingCart;
        }

        // [HttpPost]
        // public async Task<ActionResult> AddShoppingCartItem(int productId, int quantity)
        // {
        //     return StatusCode(201);
        // }
    }
}