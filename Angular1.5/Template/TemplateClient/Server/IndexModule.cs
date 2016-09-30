using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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