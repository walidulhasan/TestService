using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TestService.Models;
using TestService.Models.ViewModels;

namespace TestService.Controllers
{
    [Authorize]
    public class ProductsController : Controller
    {
        
        private ProductDbContext db = new ProductDbContext();
        public ActionResult Index()
        {
            return View(db.Products.ToList());
        }
        public ActionResult Create()
        {
            ViewBag.Postion = new SelectList(db.ProductsCategories, "ProductsCategoryId", "categoryName");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(ProductViewModel evm)
        {
            if (ModelState.IsValid)
            {
                if (evm.Picture != null)
                {
                    string filepath = Path.Combine("~/Picture", Guid.NewGuid().ToString() + Path.GetExtension(evm.Picture.FileName));
                    evm.Picture.SaveAs(Server.MapPath(filepath));

                    Products products = new Products
                    {
                        ProductName = evm.ProductName,
                        Quantity = evm.Quantity,
                        Price = evm.Price,
                        EntryDate = evm.EntryDate,
                        ProductsCategoryId = evm.ProductsCategoryId,
                        Picture = filepath
                    };
                    db.Products.Add(products);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                
            }
            ViewBag.Postion = new SelectList(db.ProductsCategories, "ProductsCategoryId", "categoryName");
            return View(evm);
        }
        public ActionResult Delete(int? id)
        {

            Products employees = db.Products.Find(id);

            string file_name = employees.Picture;
            string path = Server.MapPath(file_name);
            FileInfo file = new FileInfo(path);
            if (file.Exists)//check file exsit or not  
            {
                file.Delete();
            }
            var del = (from Products in db.Products where Products.ProductsId == id select Products).FirstOrDefault();
            db.Products.Remove(del);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Products employ = db.Products.Find(id);
            if (employ == null)
            {
                return HttpNotFound();
            }
            ProductViewModel evm = new ProductViewModel
            {
                ProductsId=employ.ProductsId,
                ProductName = employ.ProductName,
                Quantity = employ.Quantity,
                Price = employ.Price,
                EntryDate = employ.EntryDate,
                ProductsCategoryId = employ.ProductsCategoryId,
                //Picture = employ.Picture

            };
            ViewBag.Postion = new SelectList(db.ProductsCategories, "ProductsCategoryId", "categoryName");
            return View(evm);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(ProductViewModel evm)
        {
            if (ModelState.IsValid)
            {
                string filepath = evm.Picturee;
                if (evm.Picture != null)
                {

                    string path = Server.MapPath(filepath);
                    FileInfo file = new FileInfo(path);
                    if (file.Exists)//check file exsit or not  
                    {
                        file.Delete();
                    }

                    filepath = Path.Combine("~/Picture", Guid.NewGuid().ToString() + Path.GetExtension(evm.Picture.FileName));
                    evm.Picture.SaveAs(Server.MapPath(filepath));
                    Products employee = new Products
                    {
                        ProductsId = evm.ProductsId,
                        ProductName = evm.ProductName,
                        Quantity = evm.Quantity,
                        Price = evm.Price,
                        EntryDate = evm.EntryDate,
                        ProductsCategoryId = evm.ProductsCategoryId,
                        Picture = filepath
                    };
                    db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                else
                {
                    Products employee = new Products
                    {
                        ProductsId = evm.ProductsId,
                        ProductName = evm.ProductName,
                        Quantity = evm.Quantity,
                        Price = evm.Price,
                        EntryDate = evm.EntryDate,
                        ProductsCategoryId = evm.ProductsCategoryId,
                        Picture = filepath
                    };
                    db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            ViewBag.Postion = new SelectList(db.ProductsCategories, "ProductsCategoryId", "categoryName");
            return View(evm);
        }
        [AllowAnonymous]
        public ActionResult searchEmployee()
        {
            ViewBag.Chars = Enumerable.Range(65, 26).Select(n => (char)n).ToList();
            return View();
        }
        [AllowAnonymous]
        public PartialViewResult srEmployee(string start = "")
        {
            List<Products> modelData;
            if (string.IsNullOrEmpty(start))
            {
                modelData = db.Products.ToList();
            }
            else
            {
                modelData = db.Products.Where(c => c.ProductName.ToLower().StartsWith(start.ToLower())).ToList();
            }
            return PartialView("_srEmployee", modelData);
        }
        [AllowAnonymous]
        public PartialViewResult EpmName(string Name = "")
        {
            List<Products> modelData;
            if (string.IsNullOrEmpty(Name))
            {
                modelData = db.Products.ToList();
            }
            else
            {
                modelData = db.Products.Where(c => c.ProductName.Equals(Name)).ToList();

            }
            return PartialView("_srEmployee", modelData);
        }

    }
}