using BazaarValley.Common.Dto.User;

namespace BazaarValley.Services.Users.Services.Users;

public interface IUserService
{
    Task<UserDto> CreateAsync(UserCreateDto user);

    Task<UserDto> GetAsync(int id);

    Task<UserDto> UpdateAsync(UserUpdateDto user);

    Task DeleteAsync(int id);
    Task<UserDto> LoginAsync(UserLoginDto userLogin);
}