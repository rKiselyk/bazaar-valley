using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Domain.Items;

namespace BazaarValley.Services.Items.Mapping;

public class ItemFieldMappingProfiler : Profile
{
    public ItemFieldMappingProfiler()
    {
        CreateMap<ItemFieldModel, ItemFieldBaseDto>();
        CreateMap<ItemFieldModel, ItemFieldDto>();
    }
}