namespace BazaarValley.Common.Dto.Items;

public class ItemBaseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Quantity { get; set; }
    public int? Discount { get; set; }
    public float Ratings { get; set; }

    public double OriginPrice { get; set; }

    public double Price => Discount.HasValue ? Math.Round(OriginPrice * (1 - ((double)Discount.Value / 100)), 2) : OriginPrice;

    public IEnumerable<ItemImageDto> Images { get; set; }
}