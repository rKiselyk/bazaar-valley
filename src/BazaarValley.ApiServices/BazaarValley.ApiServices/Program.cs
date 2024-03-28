using AutoMapper;
using BazaarValley.Dal;
using BazaarValley.Services.Categories;
using BazaarValley.Services.Categories.Mapping;
using BazaarValley.Services.Items;
using BazaarValley.Services.Items.Mapping;
using BazaarValley.Services.Users;
using BazaarValley.Services.Users.Mapping;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region Compose Custom Services
builder.Services.ComposeUserServices();
builder.Services.ComposeCategoryServices();
builder.Services.ComposeItemServices();
#endregion

#region Compose Custom Mapping
// builder.Services.ComposeUserMapping();
// builder.Services.ComposeCategoryMapping();
// builder.Services.ComposeItemMapping();

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new UserMappingProfile());
    mc.AddProfile(new CategoryMappingProfile());
    mc.AddProfile(new CategoryFieldsMappingProfile());
    mc.AddProfile(new ItemMappingProfiler());
    mc.AddProfile(new ItemImageMappingProfiler());
    mc.AddProfile(new ItemFieldMappingProfiler());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
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
