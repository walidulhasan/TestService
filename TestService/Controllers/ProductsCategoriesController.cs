using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TestService.Models;

namespace TestService.Controllers
{
    [Authorize]
    public class ProductsCategoriesController : Controller
    {
        private ProductDbContext db = new ProductDbContext();

        // GET: ProductsCategories
        public ActionResult Index()
        {
            return View(db.ProductsCategories.ToList());
        }

        // GET: ProductsCategories/Create
        public ActionResult Create()
        {
            return View();
        }

       
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ProductsCategoryId,categoryName")] ProductsCategory productsCategory)
        {
            if (ModelState.IsValid)
            {
                db.ProductsCategories.Add(productsCategory);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
           

            return View(productsCategory);
        }

        // GET: ProductsCategories/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProductsCategory productsCategory = db.ProductsCategories.Find(id);
            if (productsCategory == null)
            {
                return HttpNotFound();
            }
            return View(productsCategory);
        }

        // POST: ProductsCategories/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ProductsCategoryId,categoryName")] ProductsCategory productsCategory)
        {
            if (ModelState.IsValid)
            {
                db.Entry(productsCategory).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(productsCategory);
        }

        // GET: ProductsCategories/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProductsCategory productsCategory = db.ProductsCategories.Find(id);
            if (productsCategory == null)
            {
                return HttpNotFound();
            }
            return View(productsCategory);
        }

        // POST: ProductsCategories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ProductsCategory productsCategory = db.ProductsCategories.Find(id);
            db.ProductsCategories.Remove(productsCategory);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
