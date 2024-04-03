using BazaarValley.Common.Dto.Orders;
using BazaarValley.Services.Cart.Services.Orders;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : Controller
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IOrderService _orderService;

        public OrdersController(
            ILogger<OrdersController> logger,
            IOrderService orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        [HttpGet("{userId}/history")]
        public async Task<IEnumerable<OrderDto>> GetUserOrderHistory(int userId)
        {
            var orders = await _orderService.GetAllForUser(userId);
            return orders;
        }
    }
}
