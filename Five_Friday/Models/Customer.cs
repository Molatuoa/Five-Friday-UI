using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Five_Friday.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }
}