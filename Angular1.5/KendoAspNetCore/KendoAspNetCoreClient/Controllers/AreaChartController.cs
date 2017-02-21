using System;
using System.Collections.Generic;
using System.Linq;
using Buddy.Enum;
using Buddy.UI.Kendo;
using Buddy.Web.Service;
using Buddy.Web.TabularQuery;
using KendoAspNetCoreClient.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KendoAspNetCoreClient.Controllers
{
    [Route("api/[controller]")]
    public class AreaChartController : Controller
    {
        protected readonly ILogger Logger;

        public AreaChartController(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger(nameof(AreaChartController));
        }
        
        
        [HttpGet]
        [Route(nameof(Data))]
        public ServiceResponse<object> Data([FromQuery] TabularQuery tabularQuery)
        {
            try
            {
                //var data = Buddy.Test.TestData.Data.PerformanceSnapshots.AsQueryable();

                //var seriesNames = new Dictionary<string, string>();

                //var byDate = data.GroupBy(d => d.StatTime)
                //                 .OrderBy(g => g.Key)
                //                 .ToList();
                
                //foreach(var date in byDate)
                //{
                //    var dataPoint = new Dictionary<string, object>
                //    {
                //        { "date", date.Key }
                //    };
                //    foreach(
                //}
                var result = "";
                return new ServiceResponse<object>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(Data)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<object>(false, null, ex.Message);
            }
        }
        
    }

    
}
