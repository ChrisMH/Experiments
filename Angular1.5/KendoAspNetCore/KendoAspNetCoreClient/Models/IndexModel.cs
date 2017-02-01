using Buddy.Web.Client;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace KendoAspNetCoreClient.Models
{
    public class IndexModel
    {
        public IndexModel(HttpRequest request, IHostingEnvironment environment, AppSettings appSettings)
        {
            PageConfig = new IndexPageConfig(request, appSettings);

            Styles = new HtmlBuilder
            {
                new TitleElem {Title = environment.IsDevelopment() ? "Debug | Angular 1.x Template" : "Angular 1.x Template"},
                new BaseElem {Href = PageConfig.RootUrl},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/app/images/favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.Icon},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/app/images/favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.ShortcutIcon},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/font-awesome/css/font-awesome-4.7.0.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/bootstrap/css/bootstrap-3.3.7.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/kendo/kendo.common-2017.1.118.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/kendo/kendo.bootstrap-2017.1.118.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                new LinkElem {Href = $"{PageConfig.RootUrl}css/app/app-{PageConfig.Version}.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem {Src = $"{PageConfig.RootUrl}js/shim-2.4.1.js", Type = ScriptType.Javascript},
                new ScriptElem {Src = $"{PageConfig.RootUrl}js/system-0.19.41.js", Type = ScriptType.Javascript},
                new ScriptElem {Body = $"(function() {{ System.config({{baseURL: '{PageConfig.RootUrl}'}}); }})();", Type = ScriptType.Javascript},
                new ScriptElem {Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript}
            };

            if (environment.IsDevelopment())
                Scripts.Add(new ScriptElem {Src = $"{PageConfig.RootUrl}scripts/system.config.js", Type = ScriptType.Javascript});
            else
                Scripts.Add(new ScriptElem {Src = $"{PageConfig.RootUrl}js/system.config-{PageConfig.Version}.js", Type = ScriptType.Javascript});

            Scripts.Add(new ScriptElem
            {
                Body = "(function(){System.import('app').catch(function(err){console.log(err);});})();",
                Type = ScriptType.Javascript
            });
        }

        public PageConfig PageConfig { get; }
        public HtmlBuilder Styles { get; }
        public HtmlBuilder Scripts { get; }
    }
}