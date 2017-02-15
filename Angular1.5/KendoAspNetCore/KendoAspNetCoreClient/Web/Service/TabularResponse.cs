using System.Collections.Generic;
using Newtonsoft.Json;

namespace KendoAspNetCoreClient.Web.Service
{
    public class TabularResponse<TRow>
    {
        [JsonProperty(PropertyName = "count")]
        public int Count { get; set; }
        
        [JsonProperty(PropertyName = "rows")]
        public List<TRow> Rows { get; set; }
    }
}
