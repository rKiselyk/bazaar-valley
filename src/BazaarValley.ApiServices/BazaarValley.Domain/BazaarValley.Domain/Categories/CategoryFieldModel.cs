using BazaarValley.Common.Enums;

namespace BazaarValley.Domain.Categories;

public class CategoryFieldModel
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public bool IsPrimary { get; set; }
    public FieldType Type { get; set; }
    public string Name { get; set; }
    public string AdditionValues { get; set; }

    public CategoryModel Category { get; set; }
}