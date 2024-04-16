using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using API.Models;
using API.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IdentityOverrideController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;

        public IdentityOverrideController(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpGet("User")]
        public IActionResult SearchUser(string searchValue, string searchField)
        {
            string query = QueryIdentityOverride.SearchIdentityOverrideQuery;


            // Append the appropriate SQL query 'Where' clause based on the search field
            switch (searchField.ToLower())
            {
                case "idmguid":
                    query += "[idmGuid] = @SearchValue";
                    break;
                default:
                    return BadRequest("Invalid search field.");
            }

            var parameters = new { SearchValue = searchValue };

            // Execute the query and store results
            List<IdentityOverrideModel> users = _databaseService.ExecuteQuery<IdentityOverrideModel>(query, parameters, "Connection");
            return Ok(users);
        }
    }

}
