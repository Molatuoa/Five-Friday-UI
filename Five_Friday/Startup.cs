using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Five_Friday.Startup))]
namespace Five_Friday
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
