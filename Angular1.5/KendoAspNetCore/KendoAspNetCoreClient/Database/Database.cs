using System.Collections.Generic;

namespace KendoAspNetCoreClient.Database
{
    public class Database
    {
        private List<PerformanceSnapshot> _performanceSnapshots;
        public List<PerformanceSnapshot> PerformanceSnapshots
        {
            get { return _performanceSnapshots ?? (_performanceSnapshots = PerformanceSnapshot.Load()); }
        } 
    }
}