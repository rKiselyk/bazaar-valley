using BazaarValley.Services.Cart.Services.Cart;
using BazaarValley.Services.Cart.Services.Orders;
using Microsoft.Extensions.DependencyInjection;

namespace BazaarValley.Services.Cart;

public static class DiExtensions
{
    public static IServiceCollection ComposeCartServices(this IServiceCollection services)
    {
        return services
            .AddScoped<ICartService, CartService>()
            .AddScoped<IOrderService, OrderService>();
    }

}