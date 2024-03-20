using AutoMapper;
using BazaarValley.Common.Dto.Categories;
using BazaarValley.Common.Dto.Items;
using BazaarValley.Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Categories.Services.CategoryFields;

public class CategoryFieldsService : ICategoryFieldsService
{
    private readonly ILogger<CategoryFieldsService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public CategoryFieldsService(
        ILogger<CategoryFieldsService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryFieldDto>> GetForCategory(int categoryId)
    {
        var fieldsForCategory = await _applicationContext.CategoryFields.Where(field => field.CategoryId == categoryId)
            .ToListAsync();
        return _mapper.Map<IEnumerable<CategoryFieldDto>>(fieldsForCategory);
    }

    public async Task<IEnumerable<CategoryFieldValueDto>> GetFieldsValuesAsync(int categoryId)
    {
        var existingCategoryFields = await _applicationContext.CategoryFields.Where(categoryFields => categoryFields.CategoryId == categoryId).ToListAsync();

        var fieldsValues = new List<CategoryFieldValueDto>();
        foreach (var categoryField in existingCategoryFields)
        {
            var values = _applicationContext.ItemsFields.Where(itemField => itemField.CategoryFieldId == categoryField.Id);

            fieldsValues.Add(new CategoryFieldValueDto
            {
                Field = _mapper.Map<CategoryFieldDto>(categoryField),
                Values = _mapper.Map<IEnumerable<ItemFieldBaseDto>>(values)
            });
        }

        return fieldsValues;
    }
}