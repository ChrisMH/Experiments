﻿
using System.IO;
using Buddy.AspNetCore.Web;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using KendoAspNetCoreClient.Models;

namespace KendoAspNetCoreClient
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            AppSettings = new AppSettings(Configuration);
            
        }

        public IConfigurationRoot Configuration { get; }
        public AppSettings AppSettings { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddSingleton(Configuration);
            services.AddSingleton(AppSettings);
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddNLog();
            env.ConfigureNLog("nlog.config");

            var logger = loggerFactory.CreateLogger(nameof(Startup));

            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                logger.LogInformation("Development Mode");
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseSimpleLogger(loggerFactory);

                app.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory()),
                    RequestPath = new PathString("")
                });
            }
            else
            {
                logger.LogInformation("Production Mode");
                app.UseExceptionHandler("/Home/Error");
            }


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{*url}",
                    defaults: new {controller = "Main", action = "Index"});
            });
        }
    }
}
