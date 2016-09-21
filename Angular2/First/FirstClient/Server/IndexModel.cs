using Buddy.Nancy.Page;
using Buddy.Web;
using Nancy;

namespace FirstClient.Server
{
    public class IndexPageConfig : PageConfig
    {
        public IndexPageConfig(NancyContext context)
            :base(context)
        {
        }
        }

    public class IndexModel
    {
        public IndexModel(NancyContext context)
        {
            PageConfig = new IndexPageConfig(context);

#if DEBUG
            StyleSheets = new LinkBuilder
            {
                //new LinkDef {Href ="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.css", Type = LinkType.Css, Rel = LinkRelType.Stylesheet }
            };

            
            Scripts = new ScriptBuilder
            {
                new ScriptDef { Src = "node_modules/core-js/client/shim.js", Type = ScriptType.Javascript },
                new ScriptDef { Src = "node_modules/zone.js/dist/zone.js", Type = ScriptType.Javascript },
                new ScriptDef { Src = "node_modules/reflect-metadata/Reflect.js", Type = ScriptType.Javascript },
                new ScriptDef { Src = "node_modules/systemjs/dist/system.src.js", Type = ScriptType.Javascript },
                new ScriptDef { Src = "Client/system.config.js", Type = ScriptType.Javascript },
                new ScriptDef { Body = "System.import('app').catch (function(err){ console.error(err); })", Type = ScriptType.Javascript }
            };
#else
            StyleSheets = new StyleSheets
            {
                new LinkDef {Href ="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css", Rel="stylesheet", Type="text/css" }
            };

            Scripts = new Scripts
            {
                new ScriptDef { Src = "https://cdnjs.cloudflare.com/ajax/libs/angular.js/2.0.0-beta.17/angular2.min.js", Type = "text/javascript" }
            };
#endif
        }

        public IndexPageConfig PageConfig { get; private set; }
        public ScriptBuilder Scripts { get; private set; }
        public LinkBuilder StyleSheets { get; private set; }


    }
}