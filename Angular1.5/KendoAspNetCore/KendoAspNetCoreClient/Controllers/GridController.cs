using System;
using System.Collections.Generic;
using System.Linq;
using Buddy.Enum;
using Buddy.Test.TestData;
using Buddy.Web.Service;
using Buddy.Web.TabularQuery;
using KendoAspNetCoreClient.Models;
using KendoAspNetCoreClient.Models.Kendo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KendoAspNetCoreClient.Controllers
{
    [Route("api/[controller]")]
    public class GridController : Controller
    {
        protected readonly ILogger Logger;

        public GridController(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger(nameof(GridController));
        }

        [HttpGet]
        [Route(nameof(FilterConfig))]
        public ServiceResponse<DropdownConfig<GridFilterType, DropdownValue<GridFilterType>>> FilterConfig()
        {
            try
            {   
                var result = new DropdownConfig<GridFilterType, DropdownValue<GridFilterType>>
                {
                    Default = GridFilterType.Backlog,
                    Values = new List<DropdownValue<GridFilterType>>()
                };

                foreach(var val in Enum.GetValues(typeof(GridFilterType)))
                {
                    result.Values.Add(new DropdownValue<GridFilterType>
                    {
                        Id = (GridFilterType)val,
                        Name = ((Enum)val).GetDescription()
                    });
                }

                return new ServiceResponse<DropdownConfig<GridFilterType, DropdownValue<GridFilterType>>>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(FilterConfig)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<DropdownConfig<GridFilterType, DropdownValue<GridFilterType>>>(false, null, ex.Message);
            }
        }

        [HttpGet]
        [Route(nameof(GridConfig))]
        public ServiceResponse<GridConfig> GridConfig([FromQuery] GridQuery query)
        {
            try
            {   
                var result = new GridConfig
                {
                    Columns = GetGridColumns(query)
                };
                
                return new ServiceResponse<GridConfig>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(GridConfig)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<GridConfig>(false, null, ex.Message);
            }
        }

        [HttpGet]
        [Route(nameof(Data))]
        public ServiceResponse<TabularResponse<PerformanceSnapshot>> Data([FromQuery] TabularQuery tabularQuery)
        {
            try
            {
                var data = Buddy.Test.TestData.Data.PerformanceSnapshots.AsQueryable();
                var result = data.ApplyQuery(tabularQuery);
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(Data)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<TabularResponse<PerformanceSnapshot>>(false, null, ex.Message);
            }
        }
        
                /*
        var columns = [
            new KendoUtil.JsGridColumn("backlog", "Backlog", "number", 100, "n0", "average", "Avg:"),
            new KendoUtil.JsGridColumn("lastReceivedOn", "Last Rx", "Date", 160, "MM/dd/yyyy hh:mm tt"),
            new KendoUtil.JsGridColumn("totalReceived", "Total Rx", "number", 100, "n0", "max", "Max:"),

            new KendoUtil.JsGridColumn("databaseConnections", "Db Conn", "number", 100, "n0", "sum", "Sum:"),
            new KendoUtil.JsGridColumn("idleDatabaseConnections", "Idle Db Conn", "number", 100, "n0"),
            new KendoUtil.JsGridColumn("pctProcessorTime", "Pct Processor", "number", 100, "n2"),
            new KendoUtil.JsGridColumn("availableMBytes", "MBytes", "number", 100, "n0", "min", "Min:"),
            new KendoUtil.JsGridColumn("pctPagingFileUsage", "Pct Paging", "number", 100, "n2")
        ];
        */

        private List<GridColumn> GetGridColumns(GridQuery query)
        {
            var columns = new List<GridColumn>
            {
                new GridColumn { Field = "customerId", Type = "number", Hidden = true },
                new GridColumn { Field = "customerName", Title = "Customer Name", Type = "string", Width = "*", Aggregate = "count", FooterHeader = "Total:" },
                new GridColumn { Field = "statTime", Title = "Time", Type = "Date", Width = "160", Format = "MM/dd/yyyy hh:mm tt" }
            };

            if(query.Filter == GridFilterType.Backlog)
            {
                columns.AddRange(new [] {
                    new GridColumn { Field = "backlog", Title = "Backlog", Type = "number", Width = "100", Format = "n0", Aggregate = "average", FooterHeader = "Avg:" },
                    new GridColumn { Field = "lastReceivedOn", Title = "Last Rx", Type = "Date", Width = "160", Format = "MM/dd/yyyy hh:mm tt" },
                    new GridColumn { Field = "totalReceived", Title = "Total Rx", Type = "number", Width = "100", Format = "n0", Aggregate = "average", FooterHeader = "Avg:" }
                });
            }
            else
            {
                columns.AddRange(new [] {
                    new GridColumn { Field = "databaseConnections", Title = "Db Conn", Type = "number", Width = "100", Format = "n0", Aggregate = "average", FooterHeader = "Avg:" },
                    new GridColumn { Field = "idleDatabaseConnections", Title = "Idle Db Conn", Type = "number", Width = "100", Format = "n0", Aggregate = "average", FooterHeader = "Avg:" },
                    new GridColumn { Field = "pctProcessorTime", Title = "Pct Processor", Type = "number", Width = "100", Format = "n2", Aggregate = "average", FooterHeader = "Avg:" },
                    new GridColumn { Field = "pctPagingFileUsage", Title = "Pct Paging", Type = "number", Width = "100", Format = "n2", Aggregate = "average", FooterHeader = "Avg:" },
                    new GridColumn { Field = "availableMBytes", Title = "Avail MBytes", Type = "number", Width = "100", Format = "n0", Aggregate = "average", FooterHeader = "Avg:" }
                });
            }

            return columns;
        }
    }


    public class GridQuery
    {
        public GridFilterType Filter { get; set; }
    }
}
