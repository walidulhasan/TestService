using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TestService.CustomValidation;

namespace TestService.Models
{
    public class ProductsCategory
    {
        public int ProductsCategoryId { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty"),Display(Name ="Category Name")]
        [UpperCase]
        public string categoryName { get; set; }
        //nev
        public List<Products> Products { get; set; }
    }
    public class Products
    {
        public int ProductsId { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty")]
        public string ProductName { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty")]
        public int Price { get; set; }
        [Required, Display(Name = "Entry Date")]
        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public System.DateTime EntryDate { get; set; }
        public string Picture { get; set; }
        //fk
        [Required(ErrorMessage = "It cannot remain empty"),ForeignKey("ProductsCategory")]
        public int ProductsCategoryId { get; set; }
        //nav
        public virtual ProductsCategory ProductsCategory { get; set; }

    }
    public class ProductDbContext : DbContext
    {
        public DbSet<ProductsCategory> ProductsCategories { get; set; }
        public DbSet<Products> Products { get; set; }
    }
}