using System;
using System.Linq;
using Buddy.Test.TestData;
using Buddy.Web.Service;
using Buddy.Web.TabularQuery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KendoAspNetCoreClient.Controllers
{
    [Route("api/[controller]")]
    public class DatabaseController : Controller
    {
        protected readonly ILogger Logger;

        public DatabaseController(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger(nameof(DatabaseController));
        }

        [HttpGet]
        [Route("Performance")]
        public ServiceResponse<TabularResponse<PerformanceSnapshot>> Performance([FromQuery] TabularQuery tabularQuery)
        {
            try
            {
                var data = Data.PerformanceSnapshots.AsQueryable();
                var result = data.ApplyQuery(tabularQuery);
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(DatabaseController)}.{nameof(Performance)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(false, null, ex.Message);
            }
        }
        
    }
}
