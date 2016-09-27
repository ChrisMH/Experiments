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
                new LinkElem { Href = $"{PageConfig.RootUrl}css/img/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.ShortcutIcon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/img/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.Icon }

            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem {Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript}
            };

            App = new HtmlBuilder();
            
            if (Debug)
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}css/styles-{PageConfig.Version}.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet }
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem {Src = $"{PageConfig.RootUrl}js/boot-{PageConfig.Version}.js", Type = ScriptType.Javascript},
                    new ScriptElem {Src = $"{PageConfig.RootUrl}scripts/system.dev.js", Type = ScriptType.Javascript},
                    new ScriptElem { Body= "(function() { System.import('app').catch(err => console.error(err)); })()", Type = ScriptType.Javascript }
                });
            }
            else
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}css/styles-{PageConfig.Version}.min.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet }
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem {Src = $"{PageConfig.RootUrl}js/boot-{PageConfig.Version}.min.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = $"{PageConfig.RootUrl}js/lib-{PageConfig.Version}.min.js", Type = ScriptType.Javascript }
                });

                App.Add(new ScriptElem { Src = $"{PageConfig.RootUrl}js/app-{PageConfig.Version}.min.js", Type = ScriptType.Javascript });
            }

        }
    }
}