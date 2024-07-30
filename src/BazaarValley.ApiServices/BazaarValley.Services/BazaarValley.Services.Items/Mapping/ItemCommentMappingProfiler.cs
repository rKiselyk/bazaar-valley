using AutoMapper;
using BazaarValley.Common.Dto.Items.Comments;
using BazaarValley.Domain.Items;

namespace BazaarValley.Services.Items.Mapping;

public class ItemCommentMappingProfiler : Profile
{
    public ItemCommentMappingProfiler()
    {
        CreateMap<ItemCommentModel, ItemCommentDto>();

        CreateMap<ItemCreateCommentDto, ItemCommentModel>();
    }
}