namespace BazaarValley.Common.Dto.Items;

public class ItemSearchDto
{
    public int TotalItemNumber { get; set; }

    public IEnumerable<ItemBaseDto> Items { get; set; }
}