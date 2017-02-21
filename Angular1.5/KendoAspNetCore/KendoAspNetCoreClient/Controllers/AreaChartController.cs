using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using Buddy.Enum;
using Buddy.Test.PerformanceTestData;
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
        
        public class ChartConfig
        {
            public string Title { get; set; }

        }

        [HttpGet]
        [Route(nameof(ChartData))]
        public ServiceResponse<TabularResponse> ChartData([FromQuery] TabularQuery tabularQuery)
        {
            try
            {

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
                
                var data = Db.Backlog.AsQueryable();
                var result = data.ApplyQuery(tabularQuery);

                return new ServiceResponse<TabularResponse>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(ChartData)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<TabularResponse>(false, null, ex.Message);
            }
        }
        
    }

    
}
