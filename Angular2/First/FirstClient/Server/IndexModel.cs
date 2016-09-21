using System.Reflection;
using Buddy.Nancy.Page;
using Buddy.Web;
using Nancy;

namespace FirstClient.Server
{
    public class IndexModel : NancyModelBase
    {
#if DEBUG
        protected readonly bool Debug = true;
#else
        protected readonly bool Debug = false;
#endif


        public IndexModel(NancyContext context)
            : base(context)
        {
        }

        protected override NancyPageConfig InitPageConfig()
        {
            return new IndexPageConfig(Context, Assembly.GetExecutingAssembly(), Debug);
        }

        protected override LinkBuilder InitFavIcons()
        {
            return base.InitFavIcons();
        }
        
        protected override LinkBuilder InitStylesheets()
        {
            if (Debug)
            {
                return new LinkBuilder
                {
                    new LinkDef {Href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                    new LinkDef {Href = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
                };
            }
            else
            {
                return new LinkBuilder
                {
                    new LinkDef {Href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet},
                    new LinkDef {Href = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet}
                };
            }
        }


        protected override ScriptBuilder InitScripts()
        {
            if (Debug)
            {
                return new ScriptBuilder
                {
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/shim.js", Type = ScriptType.Javascript},
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.6.25/zone.js", Type = ScriptType.Javascript},
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.1.8/Reflect.js", Type = ScriptType.Javascript},
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.src.js", Type = ScriptType.Javascript}

                };
            }
            else
            {
                return new ScriptBuilder
                {
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/shim.min.js", Type = ScriptType.Javascript},
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.6.25/zone.min.js", Type = ScriptType.Javascript},
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.1.8/Reflect.min.js", Type = ScriptType.Javascript},
                    new ScriptDef {Src = "https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.src.js", Type = ScriptType.Javascript}
                };
            }
        }
    }
}