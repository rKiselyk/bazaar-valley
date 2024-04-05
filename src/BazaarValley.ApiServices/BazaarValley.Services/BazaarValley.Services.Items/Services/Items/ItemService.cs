using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Dal;
using BazaarValley.Domain.Items;
using BazaarValley.Services.Items.Services.ItemImages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Dynamic.Core;

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

    public async Task<ItemSearchDto> GetAsync(ItemFilterDto itemFilterDto)
    {
        var random = new Random();

        var existingItems = await _applicationContext.Items.Where(item => item.CategoryId == itemFilterDto.CategoryId && (!itemFilterDto.MaxPrice.HasValue || item.Price <= itemFilterDto.MaxPrice.Value))
            .Include(itemModel => itemModel.Fields).ToListAsync();

        var filteredByFields = new List<ItemModel>();

        if (itemFilterDto.FieldValues?.Any() ?? false)
        {
            filteredByFields.AddRange(existingItems.Where(existingItem => existingItem.Fields.Any(field => itemFilterDto.FieldValues.Any(filteredField => filteredField.Id == field.CategoryFieldId && field.Value.Equals(filteredField.Value)))));
        }
        else
        {
            filteredByFields = existingItems;
        }

        var totalNumber = filteredByFields.Count;

        foreach (var item in filteredByFields)
        {
            // TODO refactor from shop page
            item.Discount = Convert.ToBoolean(random.Next(0, 2)) ? random.Next(0, 100) : 0;
            item.Ratings = Convert.ToBoolean(random.Next(0, 2)) ? ((float)random.Next(0, 5) + random.NextSingle()) : (float)0.0;
        }

        if (!string.IsNullOrWhiteSpace(itemFilterDto.Sorting?.Property))
        {
            filteredByFields = filteredByFields.AsQueryable().OrderBy($"{itemFilterDto.Sorting?.Property} {(itemFilterDto.Sorting.isAsc ? "ASC" : "DESC")}").ToList();
        }

        var items = _mapper.Map<IEnumerable<ItemBaseDto>>(filteredByFields.Skip(itemFilterDto.StartFrom * itemFilterDto.ItemsPerPage).Take(itemFilterDto.ItemsPerPage).ToList());
        foreach (var item in items)
        {
            item.Images = await _imageService.GetPreviewAsync(item.Id);
        }

        return new ItemSearchDto
        {
            TotalItemNumber = totalNumber,
            Items = items
        };
    }

    public async Task<ItemDto> GetInfoAsync(int itemId)
    {
        var existingItem = await _applicationContext.Items.Where(item => item.Id == itemId).Include(item => item.Fields).FirstAsync();
        var itemInfo = _mapper.Map<ItemDto>(existingItem);

        itemInfo.Images = await _imageService.GetAsync(itemId);

        return itemInfo;
    }
}