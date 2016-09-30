using Buddy.Nancy.Page;
using Buddy.Web;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace TemplateClient.Server
{
    public class IndexModel
    {
#if DEBUG
        protected readonly bool Debug = true;
#else
        protected readonly bool Debug = false;
#endif

        public IndexModel(NancyContext context)
        {
            PageConfig = new NancyPageConfig(context, Assembly.GetExecutingAssembly());

            Styles = new HtmlBuilder
            {
                new TitleElem { Title = Debug ? "Template Client | Debug" : "Template Client" },
                new BaseElem { Href = PageConfig.RootUrl },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.Icon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.ShortcutIcon }
            };

            Scripts = new HtmlBuilder();
            
            if (Debug)
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem { Href = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css", Type= LinkType.Css, Rel= LinkRelType.Stylesheet }
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem { Src = "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js", Type = ScriptType.Javascript },

                    new ScriptElem { Src = $"{PageConfig.RootUrl}/scripts/app/TemplateApp.js", Type = ScriptType.Javascript },
                    new ScriptElem { Src = $"{PageConfig.RootUrl}/scripts/app/TemplateController.js", Type = ScriptType.Javascript }
                });
            }
            else
            {
                Styles.AddRange(new IHtmlElem[]
                {

                });

                Scripts.AddRange(new IHtmlElem[]
                {

                });
            }
        }

        public NancyPageConfig PageConfig { get; set; }

        public HtmlBuilder Styles { get; set; }
        public HtmlBuilder Scripts { get; set; }
    }
}