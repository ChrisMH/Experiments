using Nancy;

namespace TemplateClient.Server
{
    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = p => View["Index", new IndexModel(Context)];
        }
    }
}