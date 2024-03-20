using BazaarValley.Common.Dto.User;
using BazaarValley.Services.Users.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace BazaarValley.ApiServices.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : Controller
{
    private readonly ILogger<UsersController> _logger;
    private readonly IUserService _userService;

    public UsersController(
        ILogger<UsersController> logger,
        IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpPut]
    public async Task<UserDto> Create(UserCreateDto user)
    {
        var userInfo = await _userService.CreateAsync(user);
        return userInfo;
    }

    [HttpGet("{userId}")]
    public async Task<UserDto> Get(int userId)
    {
        var userInfo = await _userService.GetAsync(userId);
        return userInfo;
    }

    [HttpPost]
    public async Task<UserDto> Update(UserUpdateDto user)
    {
        var userInfo = await _userService.UpdateAsync(user);
        return userInfo;
    }

    [HttpDelete("{userId}")]
    public async Task Delete(int userId)
    {
        await _userService.DeleteAsync(userId);
    }
}