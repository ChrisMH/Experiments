﻿using Nancy;
using Nancy.Conventions;
using Nancy.TinyIoc;

namespace PrimeControls.Server
{
    public class NancyBootstrapper : DefaultNancyBootstrapper
    {
        public NancyBootstrapper()
        {
            StaticConfiguration.DisableErrorTraces = false;
        }

        protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        {
            base.ConfigureApplicationContainer(container);
        }

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);
            
            nancyConventions.StaticContentsConventions.AddDirectory("Scripts");
            nancyConventions.StaticContentsConventions.AddDirectory("Styles");
#if DEBUG
            nancyConventions.StaticContentsConventions.AddDirectory("node_modules");
#endif
        }
    }
}