using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductDiscountsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductDiscountsController(StoreContext context)
        {
            this._context = context;

        }

        [HttpGet(Name = "GetProductDiscounts")]
        public async Task<ActionResult<IEnumerable<ProductDiscount>>> GetProductDiscounts()
        {
            return await _context.ProductDiscounts.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<CreateProductDiscountDto>> AddProductDiscount(CreateProductDiscountDto dto)
        {
            var productDiscount = new ProductDiscount
            {
                Id = new Guid(),
                Name = dto.Name,
                Description = dto.Description,
                Amount = dto.Amount,
                QuantityInStock = dto.QuantityInStock,
                ProductProductDiscounts = new List<ProductProductDiscount>(),
            };

            foreach (var productId in dto.ProductIds)
            {
                var product = await _context.Products.FindAsync(productId);

                if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

                productDiscount.ProductProductDiscounts.Add(new ProductProductDiscount
                {
                    Product = product,
                    ProductDiscount = productDiscount,
                });
            }

            _context.ProductDiscounts.Add(productDiscount);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProductDiscounts", productDiscount);
            
            return  BadRequest(new ProblemDetails { Title = "Problem saving discount" });
        }
    }
}