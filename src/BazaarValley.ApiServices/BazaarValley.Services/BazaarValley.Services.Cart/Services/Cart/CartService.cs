using AutoMapper;
using BazaarValley.Common.Dto.Cart;
using BazaarValley.Dal;
using BazaarValley.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BazaarValley.Services.Cart.Services.Cart;

public class CartService : ICartService
{
    private readonly ILogger<CartService> _logger;
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public CartService(
        ILogger<CartService> logger,
        ApplicationContext applicationContext,
        IMapper mapper)
    {
        _logger = logger;
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<CartCheckDto> Buy(CartDto cart)
    {
        // TODO add validations
        var userInfo = _applicationContext.Users.First(user => user.Id == cart.UserId);

        var orderInfo = new OrderModel
        {
            Date = DateTime.UtcNow,
            UserId = userInfo.Id,
            TotalPrice = 0
        };
        await _applicationContext.Orders.AddAsync(orderInfo);
        await _applicationContext.SaveChangesAsync();

        foreach (var cartItem in cart.Items)
        {
            var existingItem = await _applicationContext.Items.FirstAsync(item => item.Id == cartItem.Id);
            if (existingItem.Quantity <= cartItem.Quantity)
            {
                throw new Exception(
                    $"Quantity to buy more then existing for item with id: {cartItem.Id} title: {existingItem.Title}");
            }

            existingItem.Quantity -= cartItem.Quantity;

            _applicationContext.Items.Update(existingItem);

            await _applicationContext.OrderItems.AddAsync(new OrderItemModel
            {
                OrderId = orderInfo.Id,
                ItemId = existingItem.Id,
                Price = existingItem.Price,
                Quantity = cartItem.Quantity
            });

            orderInfo.TotalPrice += existingItem.Price * cartItem.Quantity;
        }

        _applicationContext.Orders.Update(orderInfo);
        await _applicationContext.SaveChangesAsync();

        return new CartCheckDto
        {
            OrderId = orderInfo.Id,
            TotalPrice = orderInfo.TotalPrice,
        };
    }
}