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
    }
}