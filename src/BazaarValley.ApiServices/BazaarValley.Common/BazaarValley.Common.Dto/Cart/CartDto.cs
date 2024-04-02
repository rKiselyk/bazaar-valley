namespace BazaarValley.Common.Dto.Cart;

public class CartDto
{
    public int UserId { get; set; } // TODO take from token
    public IEnumerable<CartItemDto> Items { get; set; }
}