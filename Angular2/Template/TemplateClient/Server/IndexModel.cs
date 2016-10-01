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
        public HtmlBuilder App { get; set; }

        public IndexModel(NancyContext context)
        {
            PageConfig = new IndexPageConfig(context, Assembly.GetExecutingAssembly());

            Styles = new HtmlBuilder
            {
                new TitleElem { Title = Debug ? "Angular Template (Debug)" : "Angular Template" },
                new BaseElem { Href = PageConfig.RootUrl },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.ShortcutIcon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.Icon }

            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/core-js/shim.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/zone.js/zone.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/reflect-metadata/Reflect.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/systemjs/system.js", Type = ScriptType.Javascript },
                new ScriptElem {Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript}
            };

            App = new HtmlBuilder();
            
            if (Debug)
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}css/vendor-{PageConfig.Version}.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },
                    new LinkElem {Href = $"{PageConfig.RootUrl}css/app-{PageConfig.Version}.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet }
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem {Src = $"{PageConfig.RootUrl}scripts/app/system.config.js", Type = ScriptType.Javascript},
                    new ScriptElem { Body= "(function() { System.import('app').catch(err => console.error(err)); })()", Type = ScriptType.Javascript }
                });
            }
            else
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}css/vendor-{PageConfig.Version}.min.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },
                    new LinkElem {Href = $"{PageConfig.RootUrl}css/app-{PageConfig.Version}.min.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet }
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                 });

                App.Add(new ScriptElem { Src = $"{PageConfig.RootUrl}js/app-{PageConfig.Version}.min.js", Type = ScriptType.Javascript });
            }

        }
    }
}