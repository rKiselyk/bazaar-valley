using AutoMapper;
using BazaarValley.Common.Dto.Categories;
using BazaarValley.Dal;
using BazaarValley.Services.Categories.Services.CategoryFields;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Categories.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly ILogger<CategoryService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;
    private readonly ICategoryFieldsService _categoryFieldsService;

    public CategoryService(
        ILogger<CategoryService> logger,
        ApplicationContext applicationContext,
        IMapper mapper,
        ICategoryFieldsService categoryFieldsService)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
        _categoryFieldsService = categoryFieldsService;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        var existingCategories = await _applicationContext.Categories.ToListAsync();

        var categories = _mapper.Map<IEnumerable<CategoryDto>>(existingCategories);
        foreach (var existingCategory in categories)
        {
            existingCategory.Fields = await _categoryFieldsService.GetForCategory(existingCategory.Id);
        }

        return categories;
    }
}