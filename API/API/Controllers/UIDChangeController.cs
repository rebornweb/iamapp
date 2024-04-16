using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


[ApiController]
[Route("api/[controller]")]
public class UIDChangeController : ControllerBase
{
    private readonly string _connectionString;

    public UIDChangeController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("IDGENConnection");
    }

    [HttpGet("uidchange")]
    public IActionResult ExecuteStoredProcedure(string? oldUID = null, string? newUID = null, string? confirmUID = null)
    {
        try
        {
            List<List<Dictionary<string, object>>> allResults = new List<List<Dictionary<string, object>>>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                // Construct the SQL command dynamically with parameters
                string sqlCommand = "EXEC [IDGEN].[dbo].[IdentityUsernameChange]";

                if (!string.IsNullOrWhiteSpace(oldUID) || !string.IsNullOrWhiteSpace(newUID) || !string.IsNullOrWhiteSpace(confirmUID))
                {
                    sqlCommand += " @oldUID, @newUID, @confirmUID";
                }

                using (var command = new SqlCommand(sqlCommand, connection))
                {
                    // Add parameters to the command
                    if (!string.IsNullOrWhiteSpace(oldUID))
                    {
                        command.Parameters.AddWithValue("@oldUID", oldUID);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@oldUID", DBNull.Value);
                    }

                    if (!string.IsNullOrWhiteSpace(newUID))
                    {
                        command.Parameters.AddWithValue("@newUID", newUID);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@newUID", DBNull.Value);
                    }

                    if (!string.IsNullOrWhiteSpace(confirmUID))
                    {
                        command.Parameters.AddWithValue("@confirmUID", confirmUID);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@confirmUID", DBNull.Value);
                    }

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