using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace task_flow.utils;

public class JwtUtil
{
    private readonly IConfiguration _configuration;

    public JwtUtil(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public (string Token, DateTime expiresAt) GenerateToken(int userId, string email, string role)
    {
        var secret = _configuration["Jwt:secretKey"] ?? throw new InvalidOperationException("Invalid Secret Key");

        var issuer = _configuration["Jwt:issuer"];

        var audience = _configuration["Jwt:audience"];

        var expiresAt = DateTime.UtcNow.AddMinutes(30);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, role)
        };

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(secret)
        );

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var jwt = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        var token = new JwtSecurityTokenHandler().WriteToken(jwt);

        return (token, expiresAt);
    }
}
