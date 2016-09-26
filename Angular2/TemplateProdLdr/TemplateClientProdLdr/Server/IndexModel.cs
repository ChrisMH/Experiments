using System.Reflection;
using Buddy.Web;
using Nancy;

namespace TemplateClientProdLdr.Server
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
                new TitleElem {Title = Debug ? "Angular Template Prod Ldr (Debug)" : "Angular Template Prod Ldr"},
                new BaseElem {Href = PageConfig.RootUrl},
                new LinkElem {Href = $"{PageConfig.RootUrl}favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.ShortcutIcon},
                new LinkElem {Href = $"{PageConfig.RootUrl}favicon.ico", Type = LinkType.XIcon, Rel = LinkRelType.Icon}
            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem {Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript}
            };

            if (Debug)
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}Styles/styles-{PageConfig.Version}.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/boot-{PageConfig.Version}.js", Type = ScriptType.Javascript},
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/system.dev.js", Type = ScriptType.Javascript},
                    new ScriptElem {Body = "(function() { System.import('app').catch(err => console.error(err)); })()", Type = ScriptType.Javascript}
                });
            }
            else
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}Styles/styles-{PageConfig.Version}.min.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/boot-{PageConfig.Version}.min.js", Type = ScriptType.Javascript},
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/system.prod.js", Type = ScriptType.Javascript},
                    new ScriptElem {Body = "(function() { System.import('app').catch(err => console.error(err)); })()", Type = ScriptType.Javascript}
                });
            }
        }
    }
}