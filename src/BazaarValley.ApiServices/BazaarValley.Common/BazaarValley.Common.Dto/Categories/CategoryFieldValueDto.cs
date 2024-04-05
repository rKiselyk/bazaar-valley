namespace BazaarValley.Common.Dto.Categories;

public class CategoryFieldValueDto
{
    public CategoryFieldDto Field { get; set; }
    public IEnumerable<string> Values { get; set; }
}