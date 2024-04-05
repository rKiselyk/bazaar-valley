using AutoMapper;
using BazaarValley.Services.Categories.Mapping;
using BazaarValley.Services.Categories.Services.Categories;
using BazaarValley.Services.Categories.Services.CategoryFields;
using Microsoft.Extensions.DependencyInjection;

namespace BazaarValley.Services.Categories;

public static class DiExtensions
{
    public static IServiceCollection ComposeCategoryServices(this IServiceCollection services)
    {
        return services
            .AddScoped<ICategoryService, CategoryService>()
            .AddScoped<ICategoryFieldsService, CategoryFieldsService>();
    }

    public static IServiceCollection ComposeCategoryMapping(this IServiceCollection services)
    {
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new CategoryMappingProfile());
            mc.AddProfile(new CategoryFieldsMappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }
}