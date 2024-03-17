using System.Text.Json;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductListItemDto>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Include(p => p.ProductDiscounts)
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            var productsDtos = new List<ProductListItemDto>();

            foreach (var product in products)
            {
                productsDtos.Add(new ProductListItemDto
                {
                    Brand = product.Brand,
                    Description = product.Description,
                    Id = product.Id,
                    Name = product.Name,
                    PictureUrl = product.PictureUrl,
                    Price = product.Price,
                    QuantityInStock = product.QuantityInStock,
                    Type = product.Type,
                    ProductDiscounts = product.ProductDiscounts.Select(pd => new ProductListItemProductDiscountDto
                    {
                        Amount = pd.Amount,
                        Description = pd.Description,
                        Id = pd.Id,
                        Name = pd.Name,
                        QuantityInStock = pd.QuantityInStock 
                    }).ToList()
                });
            }

            Response.AddPaginationHeader(products.MetaData);

            return productsDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}