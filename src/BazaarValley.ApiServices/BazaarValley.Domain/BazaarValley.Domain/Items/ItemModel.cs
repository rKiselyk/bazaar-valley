using BazaarValley.Domain.Categories;

namespace BazaarValley.Domain.Items;

public class ItemModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }

    public int ShopId { get; set; }
    public ShopModel Shop { get; set; }
    public int CategoryId { get; set; }
    public CategoryModel Category { get; set; }

    public DateTime CreatedAt { get; set; }

    public List<ItemFieldModel> Fields { get; set; }
    public List<ItemImageModel> Images { get; set; }
}