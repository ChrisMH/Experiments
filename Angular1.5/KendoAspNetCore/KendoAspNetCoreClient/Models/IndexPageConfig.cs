using Buddy.AspNetCore.Web.Client;
using Microsoft.AspNetCore.Http;

namespace KendoAspNetCoreClient.Models
{
    public class IndexPageConfig : AspNetCorePageConfig
    {
        public IndexPageConfig(HttpRequest request, AppSettings appSettings)
            : base(request, appSettings.Version)
        {

        }
    }
}