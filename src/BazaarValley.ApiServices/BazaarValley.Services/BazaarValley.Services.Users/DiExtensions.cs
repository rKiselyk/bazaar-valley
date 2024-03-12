using AutoMapper;
using BazaarValley.Services.Users.Mapping;
using BazaarValley.Services.Users.Services.Users;
using Microsoft.Extensions.DependencyInjection;

namespace BazaarValley.Services.Users;

public static class DiExtensions
{
    public static IServiceCollection ComposeUserServices(this IServiceCollection services)
    {
        return services
            .AddScoped<IUserService, UserService>();
    }

    public static IServiceCollection ComposeUserMapping(this IServiceCollection services)
    {
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new UserMappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }
}