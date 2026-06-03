using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Configurar Conexão com MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ativar CORS antes da autorização
app.UseCors("AngularApp");

app.UseAuthorization();
app.MapControllers();

// Garantir a criação do banco de dados na inicialização
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

app.Run();

// Compatibility stubs for environments where Swashbuckle.AspNetCore
// is not installed. These provide no-op implementations so the project
// compiles. For a full Swagger UI install the Swashbuckle.AspNetCore NuGet package.
namespace Microsoft.Extensions.DependencyInjection
{
    public static class SwaggerServiceCollectionExtensions
    {
        public static IServiceCollection AddSwaggerGen(this IServiceCollection services)
            => services;

        public static IServiceCollection AddSwaggerGen<T>(this IServiceCollection services, System.Action<T>? setupAction)
            => services;
    }
}

namespace Microsoft.AspNetCore.Builder
{
    public static class SwaggerApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSwagger(this IApplicationBuilder app) => app;

        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app) => app;
    }
}