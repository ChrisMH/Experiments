using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy.Conventions;
using Nancy.TinyIoc;
using Newtonsoft.Json;
using Buddy.Nancy.Serialization;

namespace TemplateClient.Server
{
    public class NancyBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        {
            base.ConfigureApplicationContainer(container);

            container.Register<JsonSerializer, CustomJsonSerializer>();
        }

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.StaticContentsConventions.AddDirectory("css");
            nancyConventions.StaticContentsConventions.AddDirectory("js");

#if DEBUG
            nancyConventions.StaticContentsConventions.AddDirectory("scripts");
            nancyConventions.StaticContentsConventions.AddDirectory("node_modules");
#endif
        }

    }
}