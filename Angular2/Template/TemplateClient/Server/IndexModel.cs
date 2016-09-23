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
        public HtmlBuilder Head { get; private set; }
        public HtmlBuilder App { get; set; }

        public IndexModel(NancyContext context)
        {
            PageConfig = new IndexPageConfig(context, Assembly.GetExecutingAssembly());

            Head = new HtmlBuilder
            {
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
                    new LinkElem {Href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                    new LinkElem {Href = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},

                    new LinkElem {Href = $"{PageConfig.RootUrl}Styles/styles-{PageConfig.Version}.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },

                    new ScriptElem {Src = "https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/shim.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.6.25/zone.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = "https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.1.8/Reflect.js", Type = ScriptType.Javascript },

                    new ScriptElem { Src = $"{PageConfig.RootUrl}Scripts/lib-{PageConfig.Version}.js", Type = ScriptType.Javascript }
                });

                App.Add(new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/app-{PageConfig.Version}.js", Type = ScriptType.Javascript});
            }
            else
            {
                Head.AddRange(new IHtmlElem[]
                {
                    new LinkElem {Href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                    new LinkElem {Href = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},

                    new LinkElem {Href = $"{PageConfig.RootUrl}Styles/styles-{PageConfig.Version}.min.css", Type = LinkType.Css, Rel= LinkRelType.Stylesheet },

                    new ScriptElem {Src = "https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/shim.min.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.6.25/zone.min.js", Type = ScriptType.Javascript },
                    new ScriptElem {Src = "https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.1.8/Reflect.min.js", Type = ScriptType.Javascript },

                    new ScriptElem {Src = $"{PageConfig.RootUrl}Scripts/lib-{PageConfig.Version}.min.js", Type = ScriptType.Javascript}
                });

                App.Add(new ScriptElem { Src = $"{PageConfig.RootUrl}Scripts/app-{PageConfig.Version}.min.js", Type = ScriptType.Javascript });
            }

        }
    }
}