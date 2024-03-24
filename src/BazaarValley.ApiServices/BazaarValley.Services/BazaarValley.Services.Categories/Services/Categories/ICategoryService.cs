using BazaarValley.Common.Dto.Categories;

namespace BazaarValley.Services.Categories.Services.Categories;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
}