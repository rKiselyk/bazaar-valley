using BazaarValley.Domain.Items;

namespace BazaarValley.Domain.Orders;

public class OrderItemModel
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ItemId { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }

    public ItemModel Item { get; set; }
    public OrderModel Order { get; set; }
}