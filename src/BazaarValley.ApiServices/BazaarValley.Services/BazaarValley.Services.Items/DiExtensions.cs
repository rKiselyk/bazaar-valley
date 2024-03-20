using AutoMapper;
using BazaarValley.Services.Categories.Mapping;
using BazaarValley.Services.Items.Mapping;
using BazaarValley.Services.Items.Services.ItemImages;
using BazaarValley.Services.Items.Services.Items;
using Microsoft.Extensions.DependencyInjection;

namespace BazaarValley.Services.Items;

public static class DiExtensions
{
    public static IServiceCollection ComposeItemServices(this IServiceCollection services)
    {
        return services
            .AddScoped<IItemService, ItemService>()
            .AddScoped<IItemImageService, ItemImageService>();
    }

    public static IServiceCollection ComposeItemMapping(this IServiceCollection services)
    {
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new ItemMappingProfiler());
            mc.AddProfile(new ItemImageMappingProfiler());
            mc.AddProfile(new ItemFieldMappingProfiler());
            mc.AddProfile(new CategoryMappingProfile());
            mc.AddProfile(new CategoryFieldsMappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }
}