using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
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
        public async Task<ActionResult<IEnumerable<ProductDiscountDto>>> GetProductDiscounts()
        {
            var productDiscounts = await _context.ProductDiscounts.Include(pd => pd.Products).ToListAsync();

            var productDiscountsDtos = productDiscounts.Select(pd => new ProductDiscountDto
            {
                Id = pd.Id,
                Amount = pd.Amount,
                Description = pd.Description,
                Name = pd.Name,
                QuantityInStock = pd.QuantityInStock,
                ProductIds = pd.Products.Select(p => p.Id).ToList()
            }).ToList();

            return Ok(productDiscountsDtos);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDiscount>> AddProductDiscount(CreateProductDiscountDto dto)
        {
            var productDiscount = new ProductDiscount
            {
                Id = new Guid(),
                Name = dto.Name,
                Description = dto.Description,
                Amount = dto.Amount,
                QuantityInStock = dto.QuantityInStock,
                Products = new List<Product>()
            };

            foreach (var productId in dto.ProductIds)
            {
                var product = await _context.Products.FindAsync(productId);

                if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

                productDiscount.Products.Add(product);
            }

            _context.ProductDiscounts.Add(productDiscount);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) {
                var productDiscountDto = new ProductDiscountDto
                {
                    Amount = productDiscount.Amount,
                    Id = productDiscount.Id,
                    Name = productDiscount.Name,
                    Description = productDiscount.Description,
                    QuantityInStock = productDiscount.QuantityInStock,
                    ProductIds = productDiscount.Products.Select(p => p.Id).ToList()
                };

                return CreatedAtRoute("GetProductDiscounts", productDiscountDto);
            }

            return BadRequest(new ProblemDetails { Title = "Problem saving discount" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveProductDiscount(Guid id)
        {
            var productDiscount = await _context.ProductDiscounts
                .Include(pd => pd.Products)
                .FirstOrDefaultAsync(pd => pd.Id == id);

            if (productDiscount == null)
            {
                return NotFound($"ProductDiscount with ID {id} bot found.");
            }

            productDiscount.Products.Clear();

            _context.ProductDiscounts.Remove(productDiscount);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}