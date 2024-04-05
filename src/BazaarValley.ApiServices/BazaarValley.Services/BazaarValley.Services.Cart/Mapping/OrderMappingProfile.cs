using AutoMapper;
using BazaarValley.Common.Dto.Orders;
using BazaarValley.Domain.Orders;

namespace BazaarValley.Services.Cart.Mapping;

public class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    {
        CreateMap<OrderModel, OrderDto>();

        CreateMap<OrderItemModel, OrderItemDto>()
            .ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Item.Title));

    }
}