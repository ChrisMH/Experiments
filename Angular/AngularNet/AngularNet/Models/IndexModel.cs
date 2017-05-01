using System.Diagnostics;
using System.Reflection;
using System.Web;
using Buddy.Web.Client;

namespace AngularNet.Models
{
    public class IndexModel
    {
#if DEBUG
        static bool Debug = true;
#else
        static bool Debug = false;
#endif

        public IndexModel(HttpRequestBase request)
        {
            AppSettings = new AppSettings(request);

            Styles = new HtmlBuilder
            {
                new TitleElem {Title = Debug ? "Dev | AngularNet" : "AngularNet"},
                new BaseElem {Href = AppSettings.RootUrl},
                new LinkElem {Href = $"{AppSettings.RootUrl}public/art/favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.Icon},
                new LinkElem {Href = $"{AppSettings.RootUrl}public/art/favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.ShortcutIcon},
                new LinkElem {Href = $"{AppSettings.RootUrl}public/bootstrap/css/bootstrap-{AppSettings.Version}.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem { Body = AppSettings.ToJavascript(), Type = ScriptType.Javascript }
            };

            if (Debug)
            {
                Scripts.Add(new ScriptElem { Src = $"{AppSettings.RootUrl}node_modules/systemjs/dist/system.src.js", Type = ScriptType.Javascript });
                Scripts.Add(new ScriptElem { Src = $"{AppSettings.RootUrl}src/system.config.js", Type = ScriptType.Javascript });
                Scripts.Add(new ScriptElem
                {
                    Body = "(function(){System.import('app').catch(function(err){console.log(err);});})();",
                    Type = ScriptType.Javascript
                });
            }
            else
            {
                Scripts.Add(new ScriptElem { Src = $"{AppSettings.RootUrl}public/app-{AppSettings.Version}.js", Type = ScriptType.Javascript });
            }
        }

        protected AppSettings AppSettings { get; }
        public HtmlBuilder Styles { get; }
        public HtmlBuilder Scripts { get; }
    }
}