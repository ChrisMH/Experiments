using System.Net;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using Buddy.Web.UrlQuery;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace KendoAspNetCoreClient.Web.Service
{
    public class UrlQueryModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var queryString = WebUtility.UrlDecode(bindingContext.ActionContext.HttpContext.Request.QueryString.ToString().TrimStart('?'));
            NLog.LogManager.GetCurrentClassLogger().Info(queryString);
            bindingContext.Result = ModelBindingResult.Failed();
            //bindingContext.Result = ModelBindingResult.Success(queryString.ToQueryObject(bindingContext.ModelType));
            return Task.CompletedTask;
        }
    }
}