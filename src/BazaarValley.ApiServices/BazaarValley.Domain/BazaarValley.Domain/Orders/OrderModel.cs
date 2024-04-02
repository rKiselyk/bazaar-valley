using BazaarValley.Domain.Users;

namespace BazaarValley.Domain.Orders;

public class OrderModel // Sells
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int UserId { get; set; }
    public double TotalPrice { get; set; }

    public IEnumerable<OrderItemModel> Items { get; set; }

    public UserModel User { get; set; }
}