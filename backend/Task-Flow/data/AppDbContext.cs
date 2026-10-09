using System;
using Microsoft.EntityFrameworkCore;
using task_flow.models;

namespace task_flow.data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<User> Users {get; set;}
    public DbSet<TaskItem> Tasks {get; set;}
    public DbSet<Project> Projects {get; set;}
}
