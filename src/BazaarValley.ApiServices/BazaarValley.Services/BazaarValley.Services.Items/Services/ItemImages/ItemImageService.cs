using AutoMapper;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Items.Services.ItemImages;

public class ItemImageService : IItemImageService
{
    private readonly ILogger<ItemImageService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public ItemImageService(
        ILogger<ItemImageService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ItemImageDto>> GetAsync(int itemId)
    {
        var existingImages = await _applicationContext.ItemsImages.Where(image => image.ItemId == itemId).OrderBy(image => image.Order).ToListAsync();
        return _mapper.Map<IEnumerable<ItemImageDto>>(existingImages);
    }

    public async Task<IEnumerable<ItemImageDto>> GetPreviewAsync(int itemId)
    {
        var existingImages = await _applicationContext.ItemsImages.Where(image => image.ItemId == itemId).OrderBy(image => image.Order).Take(2).ToListAsync();
        return _mapper.Map<IEnumerable<ItemImageDto>>(existingImages);
    }
}