namespace BazaarValley.Common.Dto.User;

public class UserWishlistItemDto
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; }

    public DateTime AddedAt { get; set; }

}