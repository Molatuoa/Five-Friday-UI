using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Five_Friday.Models
{
    public class CustomerContact
    {
        public int id { get; set; }
        public int CustomerID { get; set; }
        public string email { get; set; }
        public string Contact_Number { get; set; }
        public string Name { get; set; }
    }
}