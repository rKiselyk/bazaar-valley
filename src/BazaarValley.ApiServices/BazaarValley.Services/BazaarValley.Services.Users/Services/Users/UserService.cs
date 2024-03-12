using AutoMapper;
using BazaarValley.Common.Dto.User;
using BazaarValley.Dal;
using BazaarValley.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Users.Services.Users;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public UserService(
        ILogger<UserService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<UserDto> CreateAsync(UserCreateDto user)
    {
        var userToCreate = _mapper.Map<UserModel>(user);
        // TODO add passwordHash
        userToCreate.RoleId = 1;
        userToCreate.CreatedAt = DateTime.UtcNow;

        _applicationContext.Users.Add(userToCreate);

        await _applicationContext.SaveChangesAsync();

        return await GetAsync(userToCreate.Id);
    }

    public async Task<UserDto> GetAsync(int id)
    {
        var existingUser = await _applicationContext.Users.FirstOrDefaultAsync(user => user.Id == id);
        return _mapper.Map<UserDto>(existingUser);
    }

    public Task<UserDto> UpdateAsync(UserUpdateDto user)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}