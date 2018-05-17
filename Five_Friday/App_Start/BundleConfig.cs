using System.Web;
using System.Web.Optimization;

namespace Five_Friday
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                   "~/Scripts/Shared/jquery-{version}.js",
                   "~/Scripts/Shared/app.js"));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/Shared/select2.js",
                      "~/Scripts/Shared/bootstrap.js",
                      "~/Scripts/Shared/respond.js"));
        }
    }
}
