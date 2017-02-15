using Microsoft.AspNetCore.Mvc;

namespace KendoAspNetCoreClient.Web.Service
{
    [ModelBinder(BinderType = typeof(UrlQueryModelBinder))]
    public class TabularQuery
    {
        public int Take { get; set; }
        public int Skip { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}