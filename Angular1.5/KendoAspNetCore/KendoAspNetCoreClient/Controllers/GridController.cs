using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
    public class GridController : Controller
    {
        protected readonly ILogger Logger;

        public GridController(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger(nameof(GridController));
        }

        [HttpGet]
        [Route(nameof(FilterConfig))]
        public ServiceResponse<DropDownConfig> FilterConfig()
        {
            try
            {   
                var result = new DropDownConfig
                {
                    Default = GridDataSetType.Backlog.ToString(),
                    Values = new List<DropDownValue>()
                };

                foreach(var val in Enum.GetValues(typeof(GridDataSetType)))
                {
                    result.Values.Add(new DropDownValue
                    {
                        Id = val.ToString(),
                        Name = ((Enum)val).GetDescription()
                    });
                }

                return new ServiceResponse<DropDownConfig>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(FilterConfig)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<DropDownConfig>(false, null, ex.Message);
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
        [Route(nameof(GridData))]
        public ServiceResponse<TabularResponse<GridDataModel>> GridData([FromQuery] GridQuery query, [FromQuery] TabularQuery tabularQuery)
        {
            try
            {
                IQueryable<GridDataModel> data = null;

                if(query.DataSet == GridDataSetType.Backlog)
                {
                    data = Db.Backlog.Select(b => new GridDataModel
                    {
                        CustomerId = b.CustomerId,
                        CustomerName = b.CustomerName,
                        StatTime = b.StatTime,
                        Backlog = b.Backlog,
                        LastReceivedOn = b.LastReceivedOn,
                        TotalReceived = b.TotalReceived
                    }).AsQueryable();
                }
                else
                {
                    data = Db.Performance.Select(b => new GridDataModel
                    {
                        CustomerId = b.CustomerId,
                        CustomerName = b.CustomerName,
                        StatTime = b.StatTime,
                        DatabaseConnections = b.DatabaseConnections,
                        IdleDatabaseConnections = b.IdleDatabaseConnections,
                        TotalDatabaseConnections = b.TotalDatabaseConnections,
                        TotalIdleDatabaseConnections = b.TotalIdleDatabaseConnections,
                        PctProcessorTime = b.PctProcessorTime / 100.0,
                        AvailableMBytes = b.AvailableMBytes,
                        PctPagingFileUsage = b.PctPagingFileUsage / 100.0
                    }).AsQueryable();
                }

                var result = data.ApplyQuery(tabularQuery);
                return new ServiceResponse<TabularResponse<GridDataModel>>(true, result);
            }
            catch(Exception ex)
            {
                Logger.LogError($"{nameof(GridData)} : {ex.GetType()} : {ex.Message}");
                return new ServiceResponse<TabularResponse<GridDataModel>>(false, null, ex.Message);
            }
        }
        
        private List<GridColumn> GetGridColumns([FromQuery] GridQuery query)
        {
            var properties = new List<PropertyInfo>
            {
                typeof(GridDataModel).GetProperty(nameof(GridDataModel.CustomerId)),
                typeof(GridDataModel).GetProperty(nameof(GridDataModel.CustomerName)),
                typeof(GridDataModel).GetProperty(nameof(GridDataModel.StatTime))
            };

            if(query.DataSet == GridDataSetType.Backlog)
            {
                properties.AddRange(new [] {
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.Backlog)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.LastReceivedOn)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.TotalReceived))
                });
            }
            else
            {
                properties.AddRange(new [] {
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.DatabaseConnections)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.IdleDatabaseConnections)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.TotalDatabaseConnections)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.TotalIdleDatabaseConnections)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.PctProcessorTime)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.PctPagingFileUsage)),
                    typeof(GridDataModel).GetProperty(nameof(GridDataModel.AvailableMBytes))
                });
            }

            return properties.GetColumns();
        }
    }


    public class GridQuery
    {
        public GridDataSetType DataSet { get; set; }
    }

    public class GridDataModel
    {
        [Grid("", "", hidden: true)]
        public int CustomerId { get; set; }
        
        [Grid("Customer Name", "*", aggregate: "count", footerHeader: "Total:")]
        public string CustomerName { get; set; }

        [Grid("Time", "160", "MM/dd/yyyy hh:mm tt")]
        public DateTime StatTime { get; set; }

        // Backlog

        [Grid("Backlog", "140", "n0", "average", "Avg:")]
        public int Backlog { get; set; }

        [Grid("Last Rx", "160", "MM/dd/yyyy hh:mm tt")]
        public DateTime LastReceivedOn { get; set; }

        [Grid("Total Rx", "140", "n0", "average", "Avg:")]
        public int TotalReceived { get; set; }

        // Performance

        [Grid("Db Conn", "120", "n0", "average", "Avg:")]
        public int DatabaseConnections { get; set; }
        
        [Grid("Idle Db Conn", "120", "n0", "average", "Avg:")]
        public int IdleDatabaseConnections { get; set; }
        
        [Grid("Total Db Conn", "120", "n0", "average", "Avg:")]
        public int TotalDatabaseConnections { get; set; }
        
        [Grid("Total Idle Db Conn", "120", "n0", "average", "Avg:")]
        public int TotalIdleDatabaseConnections { get; set; }
        
        [Grid("Pct Processor", "120", "p2", "average", "Avg:")]
        public double PctProcessorTime { get; set; }
        
        [Grid("Pct Paging", "120", "p2", "average", "Avg:")]
        public double PctPagingFileUsage { get; set; }

        [Grid("Avail MBytes", "120", "n0", "average", "Avg:")]
        public int AvailableMBytes { get; set; }
        
    }
}
