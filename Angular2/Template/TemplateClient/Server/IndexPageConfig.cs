using System.Reflection;
using Buddy.Nancy.Page;
using Nancy;

namespace TemplateClient.Server
{
    public class IndexPageConfig : NancyPageConfig
    {
        public IndexPageConfig(NancyContext context, Assembly versionAssembly, bool debug)
            :base(context, versionAssembly, debug)
        {
        }
    }
}