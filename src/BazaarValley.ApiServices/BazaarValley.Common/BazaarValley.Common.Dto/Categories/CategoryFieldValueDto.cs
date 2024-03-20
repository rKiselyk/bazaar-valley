using BazaarValley.Common.Dto.Items;

namespace BazaarValley.Common.Dto.Categories;

public class CategoryFieldValueDto
{
    public CategoryFieldDto Field { get; set; }
    public IEnumerable<ItemFieldBaseDto> Values { get; set; }
}