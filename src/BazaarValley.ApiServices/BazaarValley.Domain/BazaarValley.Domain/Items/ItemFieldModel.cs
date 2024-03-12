using BazaarValley.Domain.Categories;

namespace BazaarValley.Domain.Items;

public class ItemFieldModel
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public string Value { get; set; }

    public ItemModel Item { get; set; }
    public int CategoryFieldId { get; set; }
    public CategoryFieldModel CategoryField { get; set; }
}