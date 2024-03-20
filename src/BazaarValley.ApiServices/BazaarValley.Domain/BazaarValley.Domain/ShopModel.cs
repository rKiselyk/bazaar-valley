using BazaarValley.Domain.Items;
using BazaarValley.Domain.Users;

namespace BazaarValley.Domain;

public class ShopModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }

    public int OwnerId { get; set; }
    public UserModel User { get; set; }

    public DateTime CreatedAt { get; set; }

    public List<ItemModel> Items { get; set; }
}