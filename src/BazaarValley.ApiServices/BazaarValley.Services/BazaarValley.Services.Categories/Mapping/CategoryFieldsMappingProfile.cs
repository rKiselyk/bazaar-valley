using AutoMapper;
using BazaarValley.Common.Dto.Categories;
using BazaarValley.Domain.Categories;

namespace BazaarValley.Services.Categories.Mapping;

public class CategoryFieldsMappingProfile : Profile
{
    public CategoryFieldsMappingProfile()
    {
        CreateMap<CategoryFieldModel, CategoryFieldDto>();
    }
}