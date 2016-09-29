using System.Reflection;
using Buddy.Nancy.Page;
using Nancy;

namespace KendoUIClient.Server
{
    public class IndexPageConfig : NancyPageConfig
    {
        public IndexPageConfig(NancyContext context, Assembly versionAssembly)
            :base(context, versionAssembly)
        {
        }
    }
}