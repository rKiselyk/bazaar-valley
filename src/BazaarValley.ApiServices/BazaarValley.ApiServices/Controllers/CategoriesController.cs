using BazaarValley.Common.Dto.Categories;
using BazaarValley.Services.Categories.Services.Categories;
using BazaarValley.Services.Categories.Services.CategoryFields;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController : Controller
{
    private readonly ILogger<CategoriesController> _logger;
    private readonly ICategoryService _categoryService;
    private readonly ICategoryFieldsService _categoryFieldsService;

    public CategoriesController(
        ILogger<CategoriesController> logger,
        ICategoryService categoryService,
        ICategoryFieldsService categoryFieldsService)
    {
        _logger = logger;
        _categoryService = categoryService;
        _categoryFieldsService = categoryFieldsService;
    }

    [HttpGet]
    public async Task<IEnumerable<CategoryDto>> GetAll()
    {
        var categories = await _categoryService.GetAllAsync();

        return categories;
    }

    [HttpGet("{categoryId}/available-filters")]
    public async Task<CategoryAvailableFiltersDto> GetAvailableFilters(int categoryId)
    {
        var fieldsValues = await _categoryFieldsService.GetAvailableFiltersAsync(categoryId);

        return fieldsValues;
    }
}