using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IShoppingCartService
    {
        Task<ShoppingCart> GetShoppingCartAsync(string customerId);
        (ShoppingCart, string) CreateShoppingCart();
        ShoppingCartDto CreateShoppingCartDto(ShoppingCart shoppingCart);
    }
}