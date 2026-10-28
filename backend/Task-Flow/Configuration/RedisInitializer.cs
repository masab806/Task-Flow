using System;
using StackExchange.Redis;

namespace task_flow.Configuration;

public static class RedisInitializer
{
    public static IServiceCollection AddRedis(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        var connectionString = configuration["Redis"] ?? "localhost:6739";

        services.AddSingleton<IConnectionMultiplexer>(
            ConnectionMultiplexer.Connect(connectionString);
        );

        return services;
    }
}
