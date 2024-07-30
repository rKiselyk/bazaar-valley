using BazaarValley.Common.Dto.User;

namespace BazaarValley.Common.Dto.Items.Comments;

public class ItemCommentDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public float Rating { get; set; }
    public UserDto User { get; set; }
}