namespace BazaarValley.Common.Dto.Items;

public class ItemBaseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }

    public IEnumerable<ItemImageDto> Images { get; set; }
}