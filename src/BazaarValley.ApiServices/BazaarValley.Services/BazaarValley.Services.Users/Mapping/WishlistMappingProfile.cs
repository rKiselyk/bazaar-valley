using AutoMapper;
using BazaarValley.Common.Dto.User;
using BazaarValley.Domain.Users;

namespace BazaarValley.Services.Users.Mapping;

public class WishlistMappingProfile : Profile
{
    public WishlistMappingProfile()
    {
        CreateMap<WishlistItemModel, UserWishlistItemDto>()
            .ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Item.Title))
            .ForMember(dest => dest.CategoryId, opts => opts.MapFrom(src => src.Item.CategoryId));
    }
}