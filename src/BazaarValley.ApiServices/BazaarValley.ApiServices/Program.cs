using BazaarValley.Dal;
using BazaarValley.Services.Categories;
using BazaarValley.Services.Items;
using BazaarValley.Services.Users;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region Compose Custom Services
builder.Services.ComposeUserServices();
builder.Services.ComposeCategoryServices();
builder.Services.ComposeItemServices();
#endregion

#region Compose Custom Mapping
builder.Services.ComposeUserMapping();
builder.Services.ComposeCategoryMapping();
builder.Services.ComposeItemMapping();
#endregion

builder.Services.AddDbContext<ApplicationContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin"); // Use the CORS policy

app.MapControllers();

app.Run();
