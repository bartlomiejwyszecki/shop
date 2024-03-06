using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   public class DiscountsController : BaseApiController
    {
        private readonly StoreContext _context;
        public DiscountsController(StoreContext context)
        {
            this._context = context;

        }

        [HttpGet(Name = "GetProductDiscounts")]
        public async Task<ActionResult<IEnumerable<ProductDiscount>>> GetProductDiscounts()
        {
            return await _context.ProductDiscounts.ToListAsync();
        }
    }
}