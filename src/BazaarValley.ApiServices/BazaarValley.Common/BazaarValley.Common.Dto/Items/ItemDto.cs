namespace BazaarValley.Common.Dto.Items;

public class ItemDto : ItemBaseDto
{
    public string Description { get; set; }

    public IEnumerable<ItemFieldDto> Fields { get; set; }

    public int ShopId { get; set; }
    public int CategoryId { get; set; }

    public DateTime CreatedAt { get; set; }
}