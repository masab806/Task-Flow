using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using task_flow.data;
using task_flow.utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(connectionString)
);

var jwtKey = builder.Configuration["Jwt:secretKey"];

var issuer = builder.Configuration["Jwt:issuer"];

var audience = builder.Configuration["Jwt:audience"];

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
       options.TokenValidationParameters = new TokenValidationParameters
       {
         ValidateIssuer = true,
         ValidIssuer = issuer,

         ValidateAudience = true,
         ValidAudience = audience,

         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)
         ),

         ValidateLifetime = true
       }; 
    });

builder.Services.AddAuthentication();

builder.Services.AddScoped<JwtUtil>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapGet("/health", ()=>
{
    return "API Working";
});


app.Run();
