using System;
using System.Net;
using System.Net.Mail;

namespace task_flow.services.MailService;

public class MailService : IMailService
{
    private readonly SmtpClient _smtpClient;
    private readonly IConfiguration _configuration;

    public MailService(SmtpClient smtpClient, IConfiguration configuration)
    {
        _smtpClient = smtpClient;
        _configuration = configuration;
    }
    public async Task<string> SendMail(string to, string otp)
    {
        var newMailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["email:username"], "Task-Flow"),
            Subject = "OTP Verification",
            Body = $"Your Reset Password OTP is ${otp}",
            IsBodyHtml = true
        };

        newMailMessage.To.Add(to);

        await _smtpClient.SendMailAsync(newMailMessage);

        return "Success";
    }
}
