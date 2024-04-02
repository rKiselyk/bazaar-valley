using BazaarValley.Common.Dto.Cart;
using BazaarValley.Services.Cart.Services.Cart;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : Controller
{
    private readonly ILogger<CartController> _logger;
    private readonly ICartService _cartService;

    public CartController(
        ILogger<CartController> logger,
        ICartService cartService)
    {
        _logger = logger;
        _cartService = cartService;
    }

    [HttpPut("buy")]
    public async Task<CartCheckDto> Buy(CartDto cart)
    {
        var check = await _cartService.Buy(cart);
        return check;
    }
}