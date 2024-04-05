using BazaarValley.Common.Dto.User;
using BazaarValley.Services.Users.Services.Wishlist;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers;

[ApiController]
[Route("users/{userId}/wishlist")]
public class WishlistController : Controller
{
    private readonly ILogger<WishlistController> _logger;
    private readonly IWishlistService _wishlistService;

    public WishlistController(
        ILogger<WishlistController> logger,
        IWishlistService wishlistService)
    {
        _logger = logger;
        _wishlistService = wishlistService;
    }

    [HttpPut]
    public async Task<UserWishlistItemDto> Add(int userId, UserWishlistItemAddDto item)
    {
        var createdItem = await _wishlistService.AddAsync(userId, item);
        return createdItem;
    }

    [HttpGet]
    public async Task<IEnumerable<UserWishlistItemDto>> Get(int userId)
    {
        var wishlist = await _wishlistService.GetAllAsync(userId);
        return wishlist;
    }

    [HttpDelete("{itemId}")]
    public async Task Delete(int userId, int itemId)
    {
        await _wishlistService.DeleteAsync(userId, itemId);
    }
}