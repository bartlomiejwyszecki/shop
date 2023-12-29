using System.Net;
using API.Data;
using API.DTOs;
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

        public ShoppingCartDto CreateShoppingCartDto(ShoppingCart shoppingCart)
        {
            return new ShoppingCartDto
            {
                Id = shoppingCart.Id,
                CustomerId = shoppingCart.CustomerId,
                Items = shoppingCart.Items.Select(item => new ShoppingCartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}