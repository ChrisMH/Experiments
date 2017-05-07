using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web;

namespace AngularNet.Models
{
    public class AppSettings : Buddy.Web.Client.AppSettings
    {
        public AppSettings(HttpRequestBase request)
        {
            OriginUrl = request.Url.GetLeftPart(UriPartial.Authority);
            if (!OriginUrl.EndsWith("/"))
                OriginUrl += "/";

            RootUrl = request.Url.GetLeftPart(UriPartial.Authority) + request.ApplicationPath;
            if (!RootUrl.EndsWith("/"))
                RootUrl += "/";

            var version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            Version = version.Substring(0, version.LastIndexOf('.'));
        }
        
    }
}
