using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using Microsoft.AspNetCore.Cors;
using System.DirectoryServices.AccountManagement;
using System.Security.Principal;
using System.Reflection.PortableExecutable;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class ADLDSController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public ADLDSController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public IActionResult GetObjects(string uidParam = null)
        {
            string server = "domain.au:636"; // AD server name or IP address
            string username = "res\\service"; // Your Windows username with access to AD
            string password = _configuration["local"]; // Your Windows password
            string container = "OU=unit, DC=net"; // Specify the container or naming context where user objects are located
                                                         //Check enviroment variables echo %env var%
            Console.WriteLine($"Server: {server}, Username: {username}, Container: {container}, Pass: {password}");
            try
            {
                List<object> objectsList = new List<object>();

                // Create a directory entry for connecting to AD LDS
                DirectoryEntry entry = new DirectoryEntry($"LDAP://{server}/{container}", username, password);

                // Create a directory searcher
                using (DirectorySearcher searcher = new DirectorySearcher(entry))
                {
                    // Set the filter based on the uidParam if provided
                    if (!string.IsNullOrWhiteSpace(uidParam))
                    {
                        searcher.Filter = $"(&(objectClass=user)(uid={uidParam}))";
                    }
                    else
                    {
                        searcher.Filter = "(objectClass=user)";
                    }

                    // Perform the search
                    SearchResultCollection results = searcher.FindAll();

                    foreach (SearchResult result in results)
                    {
                        // Create a dictionary to store object attributes
                        Dictionary<string, object> objectAttributes = new Dictionary<string, object>();

                        // Iterate through attributes and add them to the dictionary
                        foreach (string attributeName in result.Properties.PropertyNames)
                        {
                            objectAttributes[attributeName] = result.Properties[attributeName][0];
                        }

                        // Add object attributes to the list
                        objectsList.Add(objectAttributes);
                    }
                }

                return new JsonResult(new { success = true, objects = objectsList });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, message = $"Error: {ex.Message}" });
            }
        }
    }
}
