namespace BazaarValley.Common.Dto.Orders;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public double TotalPrice { get; set; }

    public IEnumerable<OrderItemDto> Items { get; set; }
}