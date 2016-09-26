using System.Reflection;
using Buddy.Web;
using Nancy;

namespace PrimeControls.Server
{
    public class IndexModel
    {
#if DEBUG
        protected readonly bool Debug = true;
#else
        protected readonly bool Debug = false;
#endif
        public IndexPageConfig PageConfig { get; private set; }
        public HtmlBuilder Head { get; private set; }
        public HtmlBuilder App { get; set; }

        public IndexModel(NancyContext context)
        {
            PageConfig = new IndexPageConfig(context, Assembly.GetExecutingAssembly());

            Head = new HtmlBuilder
            {
                new TitleElem { Title = Debug ? "Angular Template (Debug)" : "Angular Template" },
                new BaseElem { Href = PageConfig.RootUrl },
                new LinkElem { Href = $"{PageConfig.RootUrl}favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.ShortcutIcon },
                new LinkElem { Href = $"{PageConfig.RootUrl}favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.Icon }

            };

            App = new HtmlBuilder
            {
                new ScriptElem { Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript }
            };
            
            if (Debug)
            {
                Head.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}Styles/styles-{PageConfig.Version}.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/boot-{PageConfig.Version}.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = $"{PageConfig.RootUrl}node_modules/jquery/dist/jquery.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = $"{PageConfig.RootUrl}node_modules/jquery/dist/jquery.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/system.dev.js", Type = ScriptType.Javascript }
                });

                App.Add(new ScriptElem { Body= "(function() { System.import('app').catch(err => console.error(err)); })()", Type = ScriptType.Javascript });
            }
            else
            {
                Head.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = $"{PageConfig.RootUrl}Styles/styles-{PageConfig.Version}.min.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },
                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/boot-{PageConfig.Version}.min.js", Type = ScriptType.Javascript }
                });

                App.Add(new ScriptElem { Src = $"{PageConfig.RootUrl}Scripts/app-{PageConfig.Version}.min.js", Type = ScriptType.Javascript });
            }

        }
    }
}