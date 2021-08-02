namespace TestService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class productA : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ProductsId = c.Int(nullable: false, identity: true),
                        ProductName = c.String(nullable: false),
                        Quantity = c.Int(nullable: false),
                        Price = c.Int(nullable: false),
                        EntryDate = c.DateTime(nullable: false),
                        Picture = c.String(),
                        ProductsCategoryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProductsId)
                .ForeignKey("dbo.ProductsCategories", t => t.ProductsCategoryId, cascadeDelete: true)
                .Index(t => t.ProductsCategoryId);
            
            CreateTable(
                "dbo.ProductsCategories",
                c => new
                    {
                        ProductsCategoryId = c.Int(nullable: false, identity: true),
                        categoryName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ProductsCategoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "ProductsCategoryId", "dbo.ProductsCategories");
            DropIndex("dbo.Products", new[] { "ProductsCategoryId" });
            DropTable("dbo.ProductsCategories");
            DropTable("dbo.Products");
        }
    }
}
