using System.Text;
using System.Text.Json;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

namespace doggies_week2.Controllers;

[ApiController]
[Route("[controller]")]
public class MailController : ControllerBase
{
    private const string BotEmailAddress = "aoaoaoheyyoaoaoao@gmail.com";
    private const string BotAccountPassword = "oozwtpdpdkkyrjut";

    [HttpPost("send")]
    public async Task<IActionResult> SendEmailToVisitor([FromBody] JsonElement body)
    {
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        var from = "";
        var subject = "";
        var message = "";
        try
        {
            if (!body.TryGetProperty("from", out var fromJson) || !body.TryGetProperty("subject", out var subjectJson) ||
                !body.TryGetProperty("message", out var messageJson))
                throw new ArgumentException("One of argument (from, subject, message) is missed.");
            from = fromJson.GetString()!;
            subject = subjectJson.GetString()!;
            message = messageJson.GetString()!;
            using var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(BotEmailAddress));
            email.To.Add(MailboxAddress.Parse(from));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Plain)
                { Text = $"Thanks for the review: `{message}`!", ContentType = { CharsetEncoding = Encoding.UTF8 } };
            
            using var smtp = new SmtpClient();
            smtp.CheckCertificateRevocation = false;
            await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(BotEmailAddress, BotAccountPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
        catch
        {
            await SendNotificationAboutReviewAsync(false, from, subject, message);
            return StatusCode(502);
        }
        
        await SendNotificationAboutReviewAsync(true, from, subject, message);
        return StatusCode(202);
    }

    private static async Task SendNotificationAboutReviewAsync(bool successful, string from, string subject, string message)
    {
        var successfulness = successful ? "successful" : "unsuccessful";
        message =
            $"The user {from} left a review with subject {subject} and the following content: `{message}`. It was {successfulness}.";
        subject = $"New review about doggies.com";
        try
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(BotEmailAddress));
            email.To.Add(MailboxAddress.Parse("nikita.l.boss@gmail.com"));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Plain)
                { Text = message, ContentType = { CharsetEncoding = Encoding.UTF8 } };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(BotEmailAddress, BotAccountPassword);
            smtp.CheckCertificateRevocation = false;
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
        catch
        {
            // ignored
        }
    }
}