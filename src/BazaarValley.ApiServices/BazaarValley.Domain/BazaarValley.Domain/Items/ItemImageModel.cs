namespace BazaarValley.Domain.Items;

public class ItemImageModel
{
    public int Id { get; set; }
    public string Name { get; set; } // TODO think why we need this ?)
    public string Blob { get; set; }
    public uint Order { get; set; }

    public int ItemId { get; set; }
    public ItemModel Item { get; set; }
}