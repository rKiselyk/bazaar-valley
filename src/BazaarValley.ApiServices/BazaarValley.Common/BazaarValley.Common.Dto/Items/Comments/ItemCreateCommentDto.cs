namespace BazaarValley.Common.Dto.Items.Comments;

public class ItemCreateCommentDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int UserId { get; set; }
    public float Ratings { get; set; }
}