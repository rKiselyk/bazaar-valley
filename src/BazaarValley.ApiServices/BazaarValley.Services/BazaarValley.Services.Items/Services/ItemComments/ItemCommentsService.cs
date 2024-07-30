using AutoMapper;
using BazaarValley.Common.Dto.Items.Comments;
using BazaarValley.Dal;
using BazaarValley.Domain.Items;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Items.Services.ItemComments;

public class ItemCommentsService : IItemCommentsService
{
    private readonly ILogger<ItemCommentsService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public ItemCommentsService(
        ILogger<ItemCommentsService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<ItemCommentDto> AddAsync(int itemId, ItemCreateCommentDto comment)
    {
        var model = _mapper.Map<ItemCommentModel>(comment);
        model.ItemId = itemId;
        model.CreatedAt = DateTime.UtcNow;
        _applicationContext.ItemsComments.Add(model);
        await _applicationContext.SaveChangesAsync();

        return _mapper.Map<ItemCommentDto>(model);
    }


    public async Task<IEnumerable<ItemCommentDto>> GetForItemAsync(int itemId)
    {
        var comments = await _applicationContext.ItemsComments
            .Where(c => c.ItemId == itemId)
            .Include(c => c.User)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<ItemCommentDto>>(comments);
    }
}