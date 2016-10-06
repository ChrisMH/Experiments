using System.Reflection;
using Buddy.Web;
using Nancy;

namespace TemplateClient.Server
{
    public class IndexModel
    {
#if DEBUG
        protected readonly bool Debug = true;
#else
        protected readonly bool Debug = false;
#endif

        public IndexPageConfig PageConfig { get; private set; }
        public HtmlBuilder Styles { get; private set; }
        public HtmlBuilder Scripts { get; private set; }

        public IndexModel(NancyContext context)
        {
            PageConfig = new IndexPageConfig(context, Assembly.GetExecutingAssembly());

            Styles = new HtmlBuilder
            {
                new TitleElem { Title = Debug ? "Debug | Angular 2 Template" : "Angular Template" },
                new BaseElem { Href = PageConfig.RootUrl },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/app/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.Icon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/app/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.ShortcutIcon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/bootstrap/css/bootstrap-3.3.7.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/app/app-{PageConfig.Version}.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet }
            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/shim-2.4.1.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/zone-0.6.25.js", Type = ScriptType.Javascript },
                //new ScriptElem { Src = $"{PageConfig.RootUrl}js/Reflect-0.1.8.js", Type = ScriptType.Javascript }, 
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/system-0.19.39.js", Type = ScriptType.Javascript },
                new ScriptElem { Body = $"(function() {{ System.config({{baseURL: '{PageConfig.RootUrl}'}}); }})();", Type = ScriptType.Javascript },
                new ScriptElem { Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript }
            };
            
            if (Debug)
            {
                Scripts.Add(new ScriptElem { Src = $"{PageConfig.RootUrl}scripts/system.config.js", Type = ScriptType.Javascript });
            }
            else
            {
                Scripts.Add(new ScriptElem { Src = $"{PageConfig.RootUrl}js/system.config-{PageConfig.Version}.js", Type = ScriptType.Javascript });
            }

            Scripts.Add(new ScriptElem
            {
                Body = $"(function () {{ System.import('app').catch(err => console.log(err)); }})();",
                Type = ScriptType.Javascript
            });

        }
    }
}