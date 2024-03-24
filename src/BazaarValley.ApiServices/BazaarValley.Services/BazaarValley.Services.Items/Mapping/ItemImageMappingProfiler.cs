using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Domain.Items;

namespace BazaarValley.Services.Items.Mapping;

public class ItemMappingProfiler : Profile
{
    public ItemMappingProfiler()
    {
        CreateMap<ItemModel, ItemBaseDto>();
        CreateMap<ItemModel, ItemDto>();
    }
}