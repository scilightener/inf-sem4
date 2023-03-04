using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace doggies_week2.Services;

public class EmailService : IEmailService
{
    private readonly EmailConfig _ec;

    public EmailService(IOptions<EmailConfig> emailConfig)
    {
        _ec = emailConfig.Value;
    }
    
    public async Task SendEmailToClientAsync(string to, string subject, string message)
    {
        var receiver = new MailAddress(to);
        var sender = new MailAddress(_ec.FromAddress);
        var m = new MailMessage(sender, receiver);
        m.Subject = subject;
        m.Body = message;
        using var smtp = new SmtpClient(_ec.MailServerAddress, int.Parse(_ec.MailServerPort));
        smtp.Credentials = new NetworkCredential(_ec.FromAddress, _ec.UserPassword);
        smtp.EnableSsl = true;
        await smtp.SendMailAsync(m);
    }
}