using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ProductProductDiscountsRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductProductDiscounts_ProductDiscounts_ProductDiscountId",
                table: "ProductProductDiscounts");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductProductDiscounts_Products_ProductId",
                table: "ProductProductDiscounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductProductDiscounts",
                table: "ProductProductDiscounts");

            migrationBuilder.DropIndex(
                name: "IX_ProductProductDiscounts_ProductDiscountId",
                table: "ProductProductDiscounts");

            migrationBuilder.RenameColumn(
                name: "ProductDiscountId",
                table: "ProductProductDiscounts",
                newName: "ProductDiscountsId");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductProductDiscounts",
                newName: "ProductsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductProductDiscounts",
                table: "ProductProductDiscounts",
                columns: new[] { "ProductDiscountsId", "ProductsId" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductProductDiscounts_ProductsId",
                table: "ProductProductDiscounts",
                column: "ProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProductDiscounts_ProductDiscounts_ProductDiscountsId",
                table: "ProductProductDiscounts",
                column: "ProductDiscountsId",
                principalTable: "ProductDiscounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProductDiscounts_Products_ProductsId",
                table: "ProductProductDiscounts",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductProductDiscounts_ProductDiscounts_ProductDiscountsId",
                table: "ProductProductDiscounts");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductProductDiscounts_Products_ProductsId",
                table: "ProductProductDiscounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductProductDiscounts",
                table: "ProductProductDiscounts");

            migrationBuilder.DropIndex(
                name: "IX_ProductProductDiscounts_ProductsId",
                table: "ProductProductDiscounts");

            migrationBuilder.RenameColumn(
                name: "ProductsId",
                table: "ProductProductDiscounts",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "ProductDiscountsId",
                table: "ProductProductDiscounts",
                newName: "ProductDiscountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductProductDiscounts",
                table: "ProductProductDiscounts",
                columns: new[] { "ProductId", "ProductDiscountId" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductProductDiscounts_ProductDiscountId",
                table: "ProductProductDiscounts",
                column: "ProductDiscountId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProductDiscounts_ProductDiscounts_ProductDiscountId",
                table: "ProductProductDiscounts",
                column: "ProductDiscountId",
                principalTable: "ProductDiscounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProductDiscounts_Products_ProductId",
                table: "ProductProductDiscounts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
