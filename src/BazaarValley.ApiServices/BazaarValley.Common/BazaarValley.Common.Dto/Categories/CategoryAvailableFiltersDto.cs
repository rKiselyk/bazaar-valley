namespace BazaarValley.Common.Dto.Categories;

public class CategoryAvailableFiltersDto
{
    public double MaxPrice { get; set; }
    public IEnumerable<CategoryFieldValueDto> FieldValues { get; set; }
}