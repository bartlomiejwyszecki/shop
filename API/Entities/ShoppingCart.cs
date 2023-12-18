using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<ShoppingCartItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if (existingItem == null)
            {
                Items.Add(new ShoppingCartItem{ Product = product, Quantity = quantity });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == productId);

            if (existingItem != null)
            {
                existingItem.Quantity -= quantity;

                if (existingItem.Quantity <= 0) {
                    Items.Remove(existingItem);
                }
            }
        }
    }
}