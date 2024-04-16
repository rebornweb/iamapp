using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


[Route("api/[controller]")]
[ApiController]
public class SidebySide2 : ControllerBase
{
    private readonly string _connectionString;

    public SidebySide2(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet("sideBySide")]
    public IActionResult ExecuteStoredProcedure(string spid2)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(spid2))
            {
                return BadRequest("SPID parameter cannot be null or empty.");
            }

            List<List<Dictionary<string, object>>> allResults = new List<List<Dictionary<string, object>>>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand($"EXEC HRUI..dp_SideBySide_SPID_PII @SPID_List='{spid2}'", connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        do
                        {
                            List<Dictionary<string, object>> results = new List<Dictionary<string, object>>();

                            while (reader.Read())
                            {
                                var row = new Dictionary<string, object>();

                                for (var i = 0; i < reader.FieldCount; i++)
                                {
                                    row[reader.GetName(i)] = reader[i];
                                }

                                results.Add(row);
                            }

                            allResults.Add(results);

                        } while (reader.NextResult());
                    }
                }
            }

            // Filter out empty result sets
            allResults.RemoveAll(r => r.Count == 0);

            return Ok(allResults);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}
