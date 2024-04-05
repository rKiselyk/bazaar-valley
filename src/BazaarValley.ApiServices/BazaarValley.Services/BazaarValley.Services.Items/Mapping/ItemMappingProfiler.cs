using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Domain.Items;

namespace BazaarValley.Services.Items.Mapping;

public class ItemImageMappingProfiler : Profile
{
    public ItemImageMappingProfiler()
    {
        CreateMap<ItemImageModel, ItemImageDto>();
    }
}