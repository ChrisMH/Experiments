using System;
using System.Linq;
using Buddy.Web.Service;
using Buddy.Web.TabularQuery;
using KendoAspNetCoreClient.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KendoAspNetCoreClient.Controllers
{
    [Route("api/[controller]")]
    public class DatabaseController : Controller
    {
        protected readonly ILogger Logger;
        protected readonly Database.Database Database;

        public DatabaseController(ILoggerFactory loggerFactory, Database.Database database)
        {
            Logger = loggerFactory.CreateLogger(nameof(DatabaseController));
            Database = database;    
        }

        [HttpGet]
        [Route("Performance")]
        public ServiceResponse<TabularResponse<PerformanceSnapshot>> Performance([FromQuery] TabularQuery tabularQuery)
        {
            try
            {
                var data = Database.PerformanceSnapshots.AsQueryable();
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(true, data.ApplyQuery(tabularQuery));
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(DatabaseController)}.{nameof(Performance)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(false, null, ex.Message);
            }
        }
        
    }
}
