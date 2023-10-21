using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext Context;
        public ProductsController(StoreContext context)
        {
            this.Context = context;

        }

        [HttpGet]
        public ActionResult<List<Product>> GetProducts()
        {
            var products = Context.Products.ToList();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = Context.Products.Find(id);

            return product;
        }
    }
}