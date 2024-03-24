namespace BazaarValley.Common.Dto.Items;

public class ItemFilterDto
{
    public int CategoryId { get; set; }

    public IEnumerable<ItemFieldBaseDto> FieldValues { get; set; }
}