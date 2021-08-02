namespace TestService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class productsA : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Products", "EntryDate", c => c.DateTime(nullable: false, storeType: "date"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Products", "EntryDate", c => c.DateTime(nullable: false));
        }
    }
}
