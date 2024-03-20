using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Dal;
using BazaarValley.Services.Items.Services.ItemImages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Items.Services.Items;

public class ItemService : IItemService
{
    private readonly ILogger<ItemService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;
    private readonly IItemImageService _imageService;

    public ItemService(
        ILogger<ItemService> logger,
        ApplicationContext applicationContext,
        IMapper mapper,
        IItemImageService imageService)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
        _imageService = imageService;
    }

    public async Task<IEnumerable<ItemBaseDto>> GetAsync()
    {
        var existingItems = await _applicationContext.Items.ToListAsync();
        var items = _mapper.Map<IEnumerable<ItemBaseDto>>(existingItems);
        foreach (var item in items)
        {
            item.Images = await _imageService.GetPreviewAsync(item.Id);
        }

        return items;
    }
}