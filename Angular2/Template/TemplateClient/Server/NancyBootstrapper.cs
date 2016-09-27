using Nancy;
using Nancy.Conventions;
using Nancy.TinyIoc;

namespace TemplateClient.Server
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
            
            nancyConventions.StaticContentsConventions.AddDirectory("css");
            nancyConventions.StaticContentsConventions.AddDirectory("js");
#if DEBUG
            nancyConventions.StaticContentsConventions.AddDirectory("node_modules");
            nancyConventions.StaticContentsConventions.AddDirectory("scripts");
#endif
        }
    }
}