using BazaarValley.Common.Dto.Items;
using BazaarValley.Services.Items.Services.Items;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemsController : Controller
{
    private readonly ILogger<ItemsController> _logger;
    private readonly IItemService _itemService;

    public ItemsController(
        ILogger<ItemsController> logger,
        IItemService itemService)
    {
        _logger = logger;
        _itemService = itemService;
    }

    [HttpGet]
    public async Task<IEnumerable<ItemBaseDto>> Get([FromQuery] ItemFilterDto itemsFilter) // TODO Add filtering
    {
        var items = await _itemService.GetAsync(itemsFilter);
        return items;
    }
}