using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionTestController : ControllerBase
    {
        private readonly string _connectionString;

        public ConnectionTestController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Connection");
        }

        [HttpGet]
        public IActionResult TestConnection()
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    return Ok("Connection successful.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Connection failed: {ex.Message}");
            }
        }
    }
}
