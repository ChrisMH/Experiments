using Buddy.AspNetCore.Web.Client;
using Microsoft.AspNetCore.Http;

namespace TemplateAspNetCoreClient.Models
{
    public class IndexPageConfig : AspNetCorePageConfig
    {
        public IndexPageConfig(HttpRequest request, AppSettings appSettings)
            : base(request, appSettings.Version)
        {

        }
    }
}