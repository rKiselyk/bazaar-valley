using BazaarValley.Domain.Items;
using BazaarValley.Domain.Users;

namespace BazaarValley.Domain;

public class OrderModel // Sells
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public DateTime Date { get; set; }
    public double Price { get; set; }
    public int UserId { get; set; }
    public int Quantity { get; set; }

    public ItemModel Item { get; set; }
    public UserModel User { get; set; }
}