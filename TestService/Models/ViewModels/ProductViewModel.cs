using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TestService.CustomValidation;

namespace TestService.Models.ViewModels
{
    public class ProductViewModel
    {
        public int ProductsId { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty"),Display(Name ="Name")]
        [NotNullOrWhiteSpaceValidator]
        public string ProductName { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty")]
        [RegularExpression("([1-9][0-9]*)", ErrorMessage = "Count must be a natural number")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "Price cannot bd empty")]
        [RegularExpression("([1-9][0-9]*)", ErrorMessage = "Count must be a natural number")]
        public int Price { get; set; }
        [Required, Display(Name = "Entry Date")]
        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [LessDate]
        public System.DateTime EntryDate { get; set; }
        [Display(Name = "Product Picture")]
        public string Picturee { get; set; }
        public HttpPostedFileBase Picture { get; set; }
        //fk
        [Required(ErrorMessage = "It cannot remain empty"), ForeignKey("ProductsCategory")]
        [Display(Name ="Category")]
        public int ProductsCategoryId { get; set; }
        //nav
        //public virtual ProductsCategory ProductsCategory { get; set; }
    }
}