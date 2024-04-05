using BazaarValley.Common.Dto.Cart;

namespace BazaarValley.Services.Cart.Services.Cart;

public interface ICartService
{
    Task<CartCheckDto> Buy(CartDto cart);
}