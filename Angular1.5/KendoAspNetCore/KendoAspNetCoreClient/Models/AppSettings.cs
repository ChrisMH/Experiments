using Microsoft.Extensions.Configuration;

namespace KendoAspNetCoreClient.Models
{
    public class AppSettings
    {

        public AppSettings(IConfigurationRoot configuration)
        {
            var appSettings = configuration.GetSection("AppSettings");
            Version = appSettings.GetValue<string>("Version");
        }
        
        public string Version { get; }
    }
}