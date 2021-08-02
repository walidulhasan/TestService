using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestService.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult advertisePricing()
        {
            return View();
        }
        public ActionResult faq()
        {
            return View();
        }
        public ActionResult advertiseBenefits()
        {
            return View();
        }
    }
}