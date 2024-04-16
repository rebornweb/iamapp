using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Interfaces;



namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchStaffController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;

        public SearchStaffController(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpGet("User")]
        public IActionResult SearchUser(string searchValue, string searchField)
        {
            // Read SQL query from C# file
            string query = QueryStaff.SearchStaffQuery;

            // Append the appropriate SQL query 'Where' clause based on the search field
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
            // Execute the query and store results
            List<UserModel> users = _databaseService.ExecuteQuery<UserModel>(query, parameters, "SPOTConnection");
            return Ok(users);
        }
    }
}