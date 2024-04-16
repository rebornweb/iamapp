using System.Text.Json.Serialization;
using API.DataAccess;
using API.Interfaces;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                // Configure JSON serialization options
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                options.JsonSerializerOptions.MaxDepth = 64; // Set the maximum allowed depth
            });

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        // Add LDAP authentication using Windows authentication (Negotiate)
        services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
            .AddNegotiate();

        // Register IDatabaseServices
        services.AddScoped<IDatabaseService, DatabaseService>();

        services.AddHttpContextAccessor(); // Add HttpContextAccessor for accessing HTTP context

        services.AddAuthorization();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder.WithOrigins("http://iam:82", "http://localhost:2021", "http://iama:80") // Add your allowed origins here
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials(); // Allow credentials (cookies, tokens)
                });
        });

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            // In production, remove HTTPS redirection
            // app.UseHttpsRedirection();
        }

        app.UseRouting();

        // Use CORS middleware
        app.UseCors("AllowAllOrigins");
        app.UseAuthentication(); // Use authentication middleware

        app.UseAuthorization(); // Use authorization middleware

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

    // Main method added here
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>(); // Specify your Startup class here
            });
}
