using AutoMapper;
using BazaarValley.Common.Dto.User;
using BazaarValley.Domain.Users;

namespace BazaarValley.Services.Users.Mapping;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<UserModel, UserDto>();

        CreateMap<UserCreateDto, UserModel>();
        CreateMap<UserUpdateDto, UserModel>();
    }
}