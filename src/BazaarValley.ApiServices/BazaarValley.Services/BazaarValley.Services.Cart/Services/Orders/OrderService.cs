using AutoMapper;
using BazaarValley.Common.Dto.Orders;
using BazaarValley.Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Cart.Services.Orders;

public class OrderService : IOrderService
{
    private readonly ILogger<OrderService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public OrderService(
        ILogger<OrderService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<OrderDto>> GetAllForUser(int userId)
    {
        var userOrders = await _applicationContext.Orders
            .Include(order => order.Items)
            .ThenInclude(item => item.Item)
            .OrderByDescending(order => order.Date)
            .ToListAsync();

        return _mapper.Map<IEnumerable<OrderDto>>(userOrders);
    }
}