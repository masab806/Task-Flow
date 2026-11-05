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
        var connectionString = configuration["Redis"] ?? "localhost:6379";
        var options = ConfigurationOptions.Parse(connectionString);
        options.AbortOnConnectFail = false;

        services.AddSingleton<IConnectionMultiplexer>(
            ConnectionMultiplexer.Connect(options)
        );

        return services;
    }
}
