namespace BazaarValley.Domain.Users;

public class UserModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }

    public int RoleId { get; set; }
    public RoleModel Role { get; set; }

    public DateTime CreatedAt { get; set; }

    public List<ShopModel> Shops { get; set; }
    public List<OrderModel> Orders { get; set; }
}