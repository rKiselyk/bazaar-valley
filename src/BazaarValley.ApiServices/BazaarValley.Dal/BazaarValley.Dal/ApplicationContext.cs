using BazaarValley.Domain;
using BazaarValley.Domain.Categories;
using BazaarValley.Domain.Items;
using BazaarValley.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace BazaarValley.Dal;

public class ApplicationContext : DbContext
{
    public DbSet<RoleModel> Roles { get; set; }
    public DbSet<UserModel> Users { get; set; }

    public DbSet<CategoryModel> Categories { get; set; }
    public DbSet<CategoryFieldModel> CategoryFields { get; set; }

    public DbSet<ShopModel> Shops { get; set; }

    public DbSet<ItemModel> Items { get; set; }
    public DbSet<ItemFieldModel> ItemsFields { get; set; }
    public DbSet<ItemImageModel> ItemsImages { get; set; }

    public DbSet<OrderModel> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Data Source=.\SQLEXPRESS;Initial Catalog=BazaarValley;Integrated Security=True;MultipleActiveResultSets=true;TrustServerCertificate=True");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure CategoryModel and CategoryFieldModel one-to-many relationship
        modelBuilder.Entity<CategoryModel>()
            .HasMany(c => c.Fields)
            .WithOne(f => f.Category)
            .HasForeignKey(f => f.CategoryId);

        // Configure ItemModel and ItemFieldModel one-to-many relationship
        modelBuilder.Entity<ItemModel>()
            .HasMany(i => i.Fields)
            .WithOne(f => f.Item)
            .HasForeignKey(f => f.ItemId)
            .OnDelete(DeleteBehavior.NoAction);

        // Configure ItemModel and ItemImageModel one-to-many relationship
        modelBuilder.Entity<ItemModel>()
            .HasMany(i => i.Images)
            .WithOne(img => img.Item)
            .HasForeignKey(img => img.ItemId)
            .OnDelete(DeleteBehavior.NoAction);

        // Configure ItemModel relationships
        modelBuilder.Entity<ItemModel>()
            .HasOne(i => i.Shop)
            .WithMany(s => s.Items)
            .HasForeignKey(i => i.ShopId)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ItemModel>()
            .HasOne(i => i.Category)
            .WithMany(c => c.Items)
            .HasForeignKey(i => i.CategoryId)
            .OnDelete(DeleteBehavior.NoAction);

        // Configure UserModel and RoleModel one-to-many relationship
        modelBuilder.Entity<RoleModel>()
            .HasMany(r => r.Users)
            .WithOne(u => u.Role)
            .HasForeignKey(u => u.RoleId);

        // Configure UserModel and ShopModel one-to-many relationship
        modelBuilder.Entity<UserModel>()
            .HasMany(u => u.Shops)
            .WithOne(s => s.User)
            .HasForeignKey(s => s.OwnerId);
    }
}