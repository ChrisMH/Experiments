using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using KendoAspNetCoreClient.Models;

namespace KendoAspNetCoreClient.Controllers
{
    public class MainController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly IHostingEnvironment _environment;

        public MainController(IHostingEnvironment environment, AppSettings appSettings)
        {
            _environment = environment;
            _appSettings = appSettings;
        }

        [HttpGet]
        public IActionResult Index()
        {
            ViewData.Model = new IndexModel(Request, _environment, _appSettings);
            return View();
        }
    }
}