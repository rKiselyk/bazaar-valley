using BazaarValley.Domain.Items;

namespace BazaarValley.Domain.Categories;

public class CategoryModel
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<CategoryFieldModel> Fields { get; set; }
    public List<ItemModel> Items { get; set; }
}