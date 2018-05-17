using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RestSharp;
using Five_Friday.Models;

namespace Five_Friday.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult _Index(int? Page, int? page_size, string sSearchValue)
        {
            List<CParameter> LstParameters = new List<CParameter>() { new CParameter("sSearch", (string.IsNullOrEmpty(sSearchValue) ? "" : sSearchValue)) };
            List<Customer> results = Five_Friday_Api.CallService<List<Customer>>(RestFunctions.Customers, LstParameters, Method.GET) ?? new List<Customer>();
            return View(results.ToPagedList(Page ?? 1, page_size ?? 15));
        }
        public ActionResult _addNewCustomer(Customer objCustomer)
        {
            List<CParameter> AddCustomer = new List<CParameter>() {
                new CParameter("Name", objCustomer.Name),
                new CParameter("Latitude", objCustomer.Latitude),
                new CParameter("Longitude", objCustomer.Longitude)
            };
            int? results = Five_Friday_Api.CallService<int?>(RestFunctions.Customers, AddCustomer, Method.POST) ?? new int?();
            return null;
        }
        public ActionResult _addNewContact(CustomerContact objContact)
        {
            List<CParameter> AddCustomer = new List<CParameter>() {
                new CParameter("ContactName", objContact.Name),
                new CParameter("CustomerID", objContact.CustomerID.ToString()),
                new CParameter("ContactEmail", objContact.email),
                new CParameter("Numbers", objContact.Contact_Number)
            };
            Five_Friday_Api.CallService<int?>(RestFunctions.Customers, AddCustomer, Method.POST);
            return null;
        }

        public ActionResult _GetContactsByID(int id)
        {
            List<CParameter> AddCustomer = new List<CParameter>() {
                new CParameter("CustomerID", id.ToString())
            };
            //ReturnArgs r = new ReturnArgs();
            //r.View = PartialView("_ViewContacts", res);
            List<CustomerContact> res = Five_Friday_Api.CallService<List<CustomerContact>>(RestFunctions.CustomerContacts, AddCustomer, Method.GET) ?? new List<CustomerContact>();
            return PartialView("_ViewContacts", res);//Json(r);
        }
    }
    //public class ReturnArgs
    //{
    //    public ReturnArgs()
    //    {
    //    }

    //    public int Status { get; set; }
    //    public PartialViewResult View { get; set; }
    //}
}