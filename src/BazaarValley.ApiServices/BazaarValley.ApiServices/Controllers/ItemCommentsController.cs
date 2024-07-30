using BazaarValley.Common.Dto.Items.Comments;
using BazaarValley.Services.Items.Services.ItemComments;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers;

[ApiController]
[Route("Items/{itemId}/comments")]
public class ItemCommentsController : Controller
{
    private readonly ILogger<ItemCommentsController> _logger;
    private readonly IItemCommentsService _itemCommentsService;

    public ItemCommentsController(
        ILogger<ItemCommentsController> logger,
        IItemCommentsService itemCommentsService)
    {
        _logger = logger;
        _itemCommentsService = itemCommentsService;
    }

    [HttpPost]
    public async Task<IActionResult> Add(int itemId, [FromBody] ItemCreateCommentDto comment)
    {
        var createdComment = await _itemCommentsService.AddAsync(itemId, comment);
        return Ok(createdComment);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemCommentDto>>> GetCommentsForItem(int itemId)
    {
        var comments = await _itemCommentsService.GetForItemAsync(itemId);
        return Ok(comments);
    }
}