using System;
using API.Errors;
using API.Helpers;
using API.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;
using API.Extensions;
using Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<StoreContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
   
});

builder.Services.AddDbContext<AppIdentityDbContext>(options => 
{
   options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"));
});

builder.Services.AddSingleton<IConnectionMultiplexer>(c => {
    var configuration = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"),
    true);
    return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddAutoMapper(typeof(Mappingprofiles));


builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddSwaggerDocumentation();

//seeding data

//unit of work service
builder.Services.AddScoped<IUnitOfWork , UnitOfWork>();

builder.Services.AddScoped<IOrderService,OrderService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
builder.Services.Configure<ApiBehaviorOptions>(options => {
    options.InvalidModelStateResponseFactory = ActionContext => 
    {
        var errors = ActionContext.ModelState
                .Where(e => e.Value.Errors.Count > 0 )
                .SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();
        var errorResponse = new ApiValidationErrorResponse
        {
        Errors = errors
        };
        return new BadRequestObjectResult(errorResponse);
    };
});
//configuration to ensure when we start the program the database is created and updated




var app = builder.Build();


using (var scope = app.Services.CreateScope()){
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    try{
        var context = services.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(context, loggerFactory);

        // var userManager = builder.Services.GetRequiredService<UserManager<AppUser>>();
        // var identityContext = builder.Services.GetRequiredService<AppIdentityDbContext>();
        // identityContext.Database.MigrateAsync();
        // AppIdentityDbContext.SeedUsersAsync(userManager);



    }catch(Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex,"An error ocured during Migration");
    }
}


// Configure the HTTP request pipeline.



if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();


app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();

app.UseCors(options => 
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});

 app.UseStaticFiles();

 app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

