using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoUIClient.Server
{
    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = p => View["Index", new IndexModel(Context)];
        }
    }
}