using AutoMapper;
using BazaarValley.Common.Dto.User;
using BazaarValley.Dal;
using BazaarValley.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Users.Services.Wishlist;

public class WishlistService : IWishlistService
{
    private readonly ILogger<WishlistService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public WishlistService(
        ILogger<WishlistService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserWishlistItemDto>> GetAllAsync(int userId)
    {
        var wishlist = await _applicationContext.Wishlist
            .Where(item => item.UserId == userId)
            .Include(item => item.Item)
            .ToListAsync();

        return _mapper.Map<IEnumerable<UserWishlistItemDto>>(wishlist);
    }

    public async Task<UserWishlistItemDto> AddAsync(int userId, UserWishlistItemAddDto item)
    {
        var itemModel = new WishlistItemModel
        {
            UserId = userId,
            ItemId = item.ItemId,
            AddedAt = DateTime.UtcNow,
        };

        await _applicationContext.Wishlist.AddAsync(itemModel);

        await _applicationContext.SaveChangesAsync();

        var createdItem = _applicationContext.Wishlist
            .Where(item => item.Id == itemModel.Id)
            .Include(item => item.Item)
            .FirstAsync();

        return _mapper.Map<UserWishlistItemDto>(itemModel);
    }

    public async Task DeleteAsync(int userId, int itemId)
    {
        var existingItem = await _applicationContext.Wishlist.FirstOrDefaultAsync(item => item.ItemId == itemId && item.UserId == userId);
        if (existingItem == null)
            return;

        _applicationContext.Wishlist.Remove(existingItem);
    }
}