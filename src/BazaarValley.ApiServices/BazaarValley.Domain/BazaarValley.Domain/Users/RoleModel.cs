﻿namespace BazaarValley.Domain.Users;

public class RoleModel
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<UserModel> Users { get; set; }
}