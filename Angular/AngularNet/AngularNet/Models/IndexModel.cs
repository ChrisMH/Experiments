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
                new BaseElem {Href = request.ApplicationPath},
                new LinkElem {Href = $"public/art/favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.Icon},
                new LinkElem {Href = $"public/art/favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.ShortcutIcon},
                new LinkElem {Href = Debug ?  "public/vendor.css" : $"public/vendor-{AppSettings.Version}.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                new LinkElem {Href = Debug ?  "public/app.css" : $"public/app-{AppSettings.Version}.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem { Body = AppSettings.ToJavascript(), Type = ScriptType.Javascript },
                new ScriptElem { Src = Debug ? "public/polyfills.js" : $"public/polyfills{AppSettings.Version}.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = Debug ? "public/vendor.js" : $"public/vendor{AppSettings.Version}.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = Debug ? "public/app.js" : $"public/app{AppSettings.Version}.js", Type = ScriptType.Javascript },
            };
        }

        protected AppSettings AppSettings { get; }
        public HtmlBuilder Styles { get; }
        public HtmlBuilder Scripts { get; }
    }
}