using System.Text.Json;
using doggies_week2.Services;
using Microsoft.AspNetCore.Mvc;

namespace doggies_week2.Controllers;

[ApiController]
[Route("[controller]")]
public class MailController : ControllerBase
{
    private readonly IEmailService _emailService;

    public MailController(IEmailService emailService)
    {
        _emailService = emailService;
    }
    
    [HttpPost("send")]
    public async Task<IActionResult> SendEmailToVisitor([FromBody] JsonElement body)
    {
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        if (!body.TryGetProperty("to", out var toJson) ||
            !body.TryGetProperty("subject", out var subjectJson) ||
            !body.TryGetProperty("message", out var messageJson))
            return BadRequest("One of argument (to, subject, message) is missed.");
        var to = toJson.GetString()!;
        var subject = subjectJson.GetString()!;
        var message = messageJson.GetString()!;
        try
        {
            await _emailService.SendEmailToClientAsync(to, subject, message);
            subject = "New review about doggies.com";
            message = $"The user {to} left a review with subject test and the following content: `{message}`";
            to = "nikita.l.boss@gmail.com";
            await _emailService.SendEmailToClientAsync(to, subject, message);
            return StatusCode(202);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(502);
        }
    }
}