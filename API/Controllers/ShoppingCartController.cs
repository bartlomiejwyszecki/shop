using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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

        [HttpGet(Name = "GetShoppingCart")]
        public async Task<ActionResult<ShoppingCartDto>> GetShoppingCart()
        {
            var customerId = Request.Cookies["customerId"];

            var shoppingCart = await _shoppingCartService.GetShoppingCartAsync(customerId);

            if (shoppingCart == null) return NotFound();

            return _shoppingCartService.CreateShoppingCartDto(shoppingCart);
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCartDto>> AddShoppingCartItem(int productId, int quantity)
        {
            var customerId = Request.Cookies["customerId"];

            var shoppingCart = await _shoppingCartService.GetShoppingCartAsync(customerId);

            if (shoppingCart == null)
            {
                var (newShoppingCart, newCustomerId) = _shoppingCartService.CreateShoppingCart();

                shoppingCart = newShoppingCart;

                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

                Response.Cookies.Append("customerId", newCustomerId, cookieOptions);
            }

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return NotFound();

            shoppingCart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetShoppingCart", _shoppingCartService.CreateShoppingCartDto(shoppingCart));

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveShoppingCartItem(int productId, int quantity)
        {
            var customerId = Request.Cookies["customerId"];

            var shoppingCart = await _shoppingCartService.GetShoppingCartAsync(customerId);

            if (shoppingCart == null)
            {
                return NotFound();
            }

            shoppingCart.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Unable to remove shopping cart item" });
        }
    }
}