using BazaarValley.Domain.Users;

namespace BazaarValley.Domain.Items;

public class ItemCommentModel
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public int ItemId { get; set; }

    public float Rating { get; set; }

    public int UserId { get; set; }
    public UserModel User { get; set; }
}
