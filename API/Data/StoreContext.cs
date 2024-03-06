using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<ProductDiscount> ProductDiscounts { get; set; }
        public DbSet<ProductProductDiscount> ProductProductDiscounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductProductDiscount>()
                .HasKey(ppd => new { ppd.ProductId, ppd.ProductDiscountId });

            modelBuilder.Entity<ProductProductDiscount>()
                .HasOne(ppd => ppd.Product)
                .WithMany(p => p.ProductProductDiscounts)
                .HasForeignKey(ppd => ppd.ProductId);

        modelBuilder.Entity<ProductProductDiscount>()
            .HasOne(ppd => ppd.ProductDiscount)
            .WithMany(pd => pd.ProductProductDiscounts)
            .HasForeignKey(ppd => ppd.ProductDiscountId);
        }
    }
}