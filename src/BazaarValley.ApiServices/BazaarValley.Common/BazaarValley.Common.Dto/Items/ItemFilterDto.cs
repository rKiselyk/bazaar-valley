using BazaarValley.Common.Dto.Common;

namespace BazaarValley.Common.Dto.Items;

public class ItemFilterDto
{
    public int CategoryId { get; set; }
    public int StartFrom { get; set; }
    public int ItemsPerPage { get; set; }

    public IEnumerable<ItemFieldBaseDto>? FieldValues { get; set; }

    public int? MaxPrice { get; set; }
    public SortingDto? Sorting { get; set; }
}