using BazaarValley.Common.Dto.Orders;

namespace BazaarValley.Services.Cart.Services.Orders;

public interface IOrderService
{
    Task<IEnumerable<OrderDto>> GetAllForUser(int userId);
}