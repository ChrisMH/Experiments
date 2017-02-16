using System.Collections.Generic;

namespace KendoAspNetCoreClient.Database
{
    public class Database
    {
        public IEnumerable<PerformanceSnapshot> PerformanceSnapshots
        {
            get { return PerformanceSnapshot.Load(); }
        } 
    }
}