using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ShoppingCartController : BaseApiController
    {
        private readonly ILogger<ShoppingCartController> _logger;
        private readonly StoreContext _context;
        private readonly IShoppingCartService _shoppingCartService;

        public ShoppingCartController(StoreContext context, ILogger<ShoppingCartController> logger, IShoppingCartService shoppingCartService)
        {
            _context = context;
            _logger = logger;
            _shoppingCartService = shoppingCartService;
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart()
        {
            var customerId = Request.Cookies["customerId"]; 

            var shoppingCart = await _shoppingCartService.GetShoppingCartAsync(customerId);
            
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