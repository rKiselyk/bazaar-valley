
namespace BazaarValley.Common.Dto.Categories;

public class CategoryDto : CategoryBaseDto
{
    public IEnumerable<CategoryFieldDto> Fields { get; set; }
}