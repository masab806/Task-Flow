using System;
using Microsoft.EntityFrameworkCore;
using task_flow.models;

namespace task_flow.data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<User> Users {get; set;}
}
