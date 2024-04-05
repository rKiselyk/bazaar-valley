using AutoMapper;
using BazaarValley.Common.Dto.Categories;
using BazaarValley.Domain.Categories;

namespace BazaarValley.Services.Categories.Mapping;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<CategoryModel, CategoryBaseDto>();
        CreateMap<CategoryModel, CategoryDto>()
            .ForMember(dest => dest.Fields, opts => opts.MapFrom(src => src.Fields));
    }
}