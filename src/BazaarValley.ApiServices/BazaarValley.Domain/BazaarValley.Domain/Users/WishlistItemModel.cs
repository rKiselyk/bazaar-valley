using BazaarValley.Domain.Items;

namespace BazaarValley.Domain.Users;

public class WishlistItemModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ItemId { get; set; }
    public DateTime AddedAt { get; set; }

    public ItemModel Item { get; set; }
}