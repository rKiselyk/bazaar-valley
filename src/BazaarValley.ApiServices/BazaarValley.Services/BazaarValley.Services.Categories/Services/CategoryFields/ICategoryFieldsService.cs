using BazaarValley.Common.Dto.Categories;

namespace BazaarValley.Services.Categories.Services.CategoryFields;

public interface ICategoryFieldsService
{
    Task<IEnumerable<CategoryFieldDto>> GetForCategory(int categoryId);

    Task<IEnumerable<CategoryFieldValueDto>> GetFieldsValuesAsync(int categoryId);
}