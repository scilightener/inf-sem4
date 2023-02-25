using Microsoft.AspNetCore.Mvc;

namespace doggies_week2.Controllers;

[ApiController]
[Route("[controller]")]
public class DogsController : Controller
{
    // [HttpGet]
    // public IActionResult GetAll()
    // {
    //     Response.Headers.Add("Access-Control-Allow-Origin", "*");
    //     return new JsonResult(DogsProvider.GetAll());
    // }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return new JsonResult(DogsProvider.GetById(id));
    }

    [HttpGet]
    public IActionResult GetWithFilters([FromQuery] int pageId = 1, [FromQuery] int pageSize = 10)
    {
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return new JsonResult(DogsProvider.GetWithFilters(pageId, pageSize));
    }
}
