using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Interfaces;



namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchStudentsController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;

        public SearchStudentsController(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpGet("User")]
        public IActionResult SearchUser(string searchValue, string searchField)
        {
            // Read SQL query from C# file
            string query = QueryStudents.SearchStudentsQuery;

            // Append the appropriate condition based on the search field
            switch (searchField.ToLower())
            {
                case "givenname":
                    query += "[givenName] = @SearchValue";
                    break;
                case "employeenumber":
                    query += "[employeeNumber] = @SearchValue";
                    break;
                case "idmpreferredname":
                    query += "[idmPreferredName] = @SearchValue";
                    break;
                case "sn":
                    query += "[sn] = @SearchValue";
                    break;
                case "idmeqid":
                    query += "[idmEQID] = @SearchValue";
                    break;
                case "idmguid":
                    query += "[idmGUID] = @SearchValue";
                    break;
                case "idmspid":
                    query += "[idmSPID] = @SearchValue";
                    break;
                case "uid":
                    query += "[uid] = @SearchValue";
                    break;
                default:
                    return BadRequest("Invalid search field.");
            }

            var parameters = new { SearchValue = searchValue };
            Console.WriteLine("Generated query: " + query); // Assuming this is in a console application
            // Execute the query
            List<StudentModel> users = _databaseService.ExecuteQuery<StudentModel>(query, parameters, "SPOTConnection");
            return Ok(users);
        }
    }
}