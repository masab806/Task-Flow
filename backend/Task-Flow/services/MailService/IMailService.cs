using System;

namespace task_flow.services.MailService;

public interface IMailService
{
    public Task<string> SendMail(string to, string otp);
}
