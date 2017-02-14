using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KendoAspNetCoreClient.Database;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KendoAspNetCoreClient.Controllers
{
    [Route("api/[controller]")]
    public class DatabaseController : Controller
    {
        private Database.Database _database;

        public DatabaseController(Database.Database database)
        {
            _database = database;    
        }

        [HttpGet]
        [Route("Performance")]
        public IEnumerable<PerformanceSnapshot> Performance()
        {
            return _database.PerformanceSnapshots;
        }
        
    }
}
