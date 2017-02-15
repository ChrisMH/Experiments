using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Buddy.Web.Service;
using KendoAspNetCoreClient.Database;
using KendoAspNetCoreClient.Web.Service;
using Microsoft.AspNetCore.Mvc;
using NLog;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KendoAspNetCoreClient.Controllers
{
    [Route("api/[controller]")]
    public class DatabaseController : Controller
    {
        protected readonly Logger Logger;

        private Database.Database _database;

        public DatabaseController(Database.Database database)
        {
            _database = database;    
            Logger = LogManager.GetLogger(nameof(DatabaseController));
        }

        [HttpGet]
        [Route("Performance")]
        public ServiceResponse<TabularResponse<PerformanceSnapshot>> Performance([FromQuery] TabularQuery tabularQuery)
        {
            try
            {
                var data = _database.PerformanceSnapshots;

                var result = new TabularResponse<PerformanceSnapshot>
                {
                    Count = data.Count,
                    Rows = tabularQuery.PageSize > 0 ? data.Skip(tabularQuery.Skip).Take(tabularQuery.Take).ToList() : data
                };
                
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(true, result);
            }
            catch(Exception ex)
            {
                Logger.Error(ex, $"{nameof(DatabaseController)}.{nameof(Performance)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(false, null, ex.Message);
            }
        }
        
    }
}
