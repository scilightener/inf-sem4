namespace doggies_week2.Services;

public interface IEmailService
{
    public Task SendEmailToClientAsync(string to, string subject, string message);
}