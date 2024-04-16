using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using API.Models;
using System.Reflection.PortableExecutable;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    //Lost and Found in the certain environment
    public class LostandFoundController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LostandFoundController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetObjects(string uid = null)
        {
            string server = "domain.com.au:636"; // AD server name or IP address
            string username = "domain\serviceaccount"; // Your Windows username with access to AD
            string password = _configuration["VIS"]; // Your Windows password
            string container = "CN=Disabled,OU=AD,DC=visual,DC=net"; // Specify the container or naming context where user objects are located

            Console.WriteLine($"Server: {server}, Username: {username}, Container: {container}, Pass: {password}");

            try
            {
                // Create a directory entry for connecting to AD LDS
                DirectoryEntry entry = new DirectoryEntry($"LDAP://{server}/{container}", username, password);

                // Create a directory searcher
                using (DirectorySearcher searcher = new DirectorySearcher(entry))
                {
                    // Set the filter based on the uid parameter if provided
                    if (!string.IsNullOrWhiteSpace(uid))
                    {
                        searcher.Filter = $"(&(objectClass=user)(uid={uid}))";
                    }
                    else
                    {
                        searcher.Filter = "(objectClass=user)";
                    }

                    // Set properties to load
                    searcher.PageSize = 1; // Set page size to 1 to minimize data transfer
                    searcher.PropertiesToLoad.AddRange(new string[] { "name", "cn", "distinguishedName", "uid" }); // Load specified properties

                    // Perform the search and get the count of results, CNs, distinguished names, and uids
                    int objectCount = 0;
                    List<string> commonNames = new List<string>();
                    List<string> distinguishedNames = new List<string>();
                    List<string> uids = new List<string>();

                    SearchResultCollection results = searcher.FindAll();
                    if (results != null)
                    {
                        objectCount = results.Count;
                        foreach (SearchResult result in results)
                        {
                            string cn = result.Properties.Contains("cn") ? result.Properties["cn"][0].ToString() : "";
                            string distinguishedName = result.Properties.Contains("distinguishedName") ? result.Properties["distinguishedName"][0].ToString() : "";
                            string uidValue = result.Properties.Contains("uid") ? result.Properties["uid"][0].ToString() : "";
                            commonNames.Add(cn);
                            distinguishedNames.Add(distinguishedName);
                            uids.Add(uidValue);
                        }
                        results.Dispose(); // Dispose the SearchResultCollection
                    }

                    return new JsonResult(new { success = true, objectCount, commonNames, distinguishedNames, uids });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, message = $"Error: {ex.Message}" });
            }
        }
    }
}
