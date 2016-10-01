﻿using Buddy.Nancy.Page;
using Buddy.Web;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace TemplateClient.Server
{
    public class IndexModel
    {
#if DEBUG
        protected readonly bool Debug = true;
#else
        protected readonly bool Debug = false;
#endif

        public IndexModel(NancyContext context)
        {
            PageConfig = new NancyPageConfig(context, Assembly.GetExecutingAssembly());

            Styles = new HtmlBuilder
            {
                new TitleElem { Title = Debug ? "Template Client | Debug" : "Template Client" },
                new BaseElem { Href = PageConfig.RootUrl },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/app/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.Icon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/app/images/favicon.ico", Type = LinkType.XIcon, Rel= LinkRelType.ShortcutIcon },
                new LinkElem { Href = $"{PageConfig.RootUrl}css/app/app-{PageConfig.Version}.css", Type= LinkType.Css, Rel= LinkRelType.Stylesheet }
            };

            Scripts = new HtmlBuilder
            {
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/core-js/shim-2.4.1.js", Type = ScriptType.Javascript },
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/reflect-metadata/Reflect-0.1.8.js", Type = ScriptType.Javascript }, 
                //new ScriptElem {Src = $"{PageConfig.RootUrl}js/vendor/zone.js/dist/zone.js", Type = ScriptType.Javascript},
                new ScriptElem { Src = $"{PageConfig.RootUrl}js/vendor/systemjs/system-0.19.39.js", Type = ScriptType.Javascript },
                new ScriptElem {Body = PageConfig.ToJavascript(), Type = ScriptType.Javascript },
            };
            
            if (Debug)
            {
                Styles.AddRange(new IHtmlElem[]
                {
                    new LinkElem { Href = $"{PageConfig.RootUrl}css/vendor/bootstrap/bootstrap-3.3.7.css", Type= LinkType.Css, Rel= LinkRelType.Stylesheet }
                });

                Scripts.AddRange(new IHtmlElem[]
                {
                    new ScriptElem { Src = $"{PageConfig.RootUrl}/scripts/app/system.config.js", Type = ScriptType.Javascript },
                    new ScriptElem
                    {
                        Body = $"(function () {{ System.import('app').catch(err => console.log(err)); }})();",
                        Type = ScriptType.Javascript }
                });
            }
            else
            {
                Styles.AddRange(new IHtmlElem[]
                {

                });

                Scripts.AddRange(new IHtmlElem[]
                {

                });
            }
        }

        public NancyPageConfig PageConfig { get; private set; }
        public HtmlBuilder Styles { get; private set; }
        public HtmlBuilder Scripts { get; private set; }
        public ScriptElem Bootstrap { get; private set; }
    }
}