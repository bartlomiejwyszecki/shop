using System.Net;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly StoreContext _context;

        public ShoppingCartService(StoreContext context)
        {
            _context = context;
        }

        public async Task<ShoppingCart> GetShoppingCartAsync(string customerId)
        {
            return await _context.ShoppingCarts
                .Include(item => item.Items)
                .ThenInclude(product => product.Product)
                .FirstOrDefaultAsync(x => x.CustomerId == customerId);
        }

        public (ShoppingCart, string) CreateShoppingCart()
        {
            var customerId = Guid.NewGuid().ToString();
            var shoppingCart = new ShoppingCart{CustomerId = customerId};

            _context.ShoppingCarts.Add(shoppingCart);

            return (shoppingCart, customerId);
        }
    }
}