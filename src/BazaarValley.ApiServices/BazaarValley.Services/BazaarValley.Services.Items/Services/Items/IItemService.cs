using BazaarValley.Common.Dto.Items;

namespace BazaarValley.Services.Items.Services.Items;

public interface IItemService
{
    Task<IEnumerable<ItemBaseDto>> GetAsync();
}