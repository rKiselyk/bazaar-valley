using BazaarValley.Common.Dto.Items;

namespace BazaarValley.Services.Items.Services.ItemImages;

public interface IItemImageService
{
    Task<IEnumerable<ItemImageDto>> GetAsync(int itemId);

    Task<IEnumerable<ItemImageDto>> GetPreviewAsync(int itemId);
}