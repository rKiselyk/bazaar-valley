using BazaarValley.Common.Dto.Items.Comments;

namespace BazaarValley.Services.Items.Services.ItemComments;

public interface IItemCommentsService
{
    Task<ItemCommentDto> AddAsync(int itemId, ItemCreateCommentDto comment);

    Task<IEnumerable<ItemCommentDto>> GetForItemAsync(int itemId);
}