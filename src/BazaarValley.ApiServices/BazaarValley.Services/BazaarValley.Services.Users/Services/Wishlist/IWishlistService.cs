using BazaarValley.Common.Dto.User;

namespace BazaarValley.Services.Users.Services.Wishlist;

public interface IWishlistService
{
    Task<IEnumerable<UserWishlistItemDto>> GetAllAsync(int userId);

    Task<UserWishlistItemDto> AddAsync(int userId, UserWishlistItemAddDto item);

    Task DeleteAsync(int userId, int itemId);

}