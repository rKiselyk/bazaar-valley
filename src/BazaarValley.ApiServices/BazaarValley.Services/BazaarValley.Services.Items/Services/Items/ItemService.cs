using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Dal;
using BazaarValley.Domain.Items;
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

    public async Task<IEnumerable<ItemBaseDto>> GetAsync(ItemFilterDto itemFilterDto)
    {
        var existingItems = await _applicationContext.Items.Where(item => item.CategoryId == itemFilterDto.CategoryId)
            .Include(itemModel => itemModel.Fields).ToListAsync();

        var filteredByFields = new List<ItemModel>();

        if (itemFilterDto.FieldValues.Any())
        {
            filteredByFields.AddRange(existingItems.Where(existingItem => existingItem.Fields.Any(field => itemFilterDto.FieldValues.Any(filteredField => filteredField.Id == field.CategoryFieldId && field.Value.Equals(filteredField.Value)))));
        }
        else
        {
            filteredByFields = existingItems;
        }


        var items = _mapper.Map<IEnumerable<ItemBaseDto>>(filteredByFields);
        foreach (var item in items)
        {
            item.Images = await _imageService.GetPreviewAsync(item.Id);
        }

        return items;
    }

    public async Task<ItemDto> GetInfoAsync(int itemId)
    {
        var existingItem = await _applicationContext.Items.Where(item => item.Id == itemId).Include(item => item.Fields).FirstAsync();
        var itemInfo = _mapper.Map<ItemDto>(existingItem);

        itemInfo.Images = await _imageService.GetAsync(itemId);

        return itemInfo;
    }
}