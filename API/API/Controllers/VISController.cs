using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Reflection.PortableExecutable;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class VISController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public VISController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetObjectsInSpecificOUs([FromQuery] string samAccountName)
        {
            try
            {
                if (string.IsNullOrEmpty(samAccountName))
                {
                    return new JsonResult(new { success = false, message = "samAccountName is required." });
                }

                string server = "vis.res.eq.edu.au:636"; // AD server name or IP address
                string username = "res\\xs-vis-svc"; // Your Windows username with access to AD
                string password = _configuration["VIS"]; // Your Windows password

                // Define 14 different OU locations
                string[] containers = new string[]
                {
                    "OU=SUN,DC=vis,DC=net",
                    "OU=NOQ,DC=vis,DC=net",
                    "OU=RES,DC=vis,DC=net",
                    "OU=VISConfig,DC=vis,DC=net",

                    "OU=CORP,DC=vis,DC=net",
                    "OU=MTN,DC=vis,DC=net",
                    "OU=IDDIR,DC=vis,DC=net",
                    "OU=DDS,DC=vis,DC=net",

                    "OU=FCW,DC=vis,DC=net",
                    "OU=WBB,DC=vis,DC=net",
                    "OU=GBN,DC=vis,DC=net",
                    "OU=SOC,DC=vis,DC=net",

                    "OU=MYW,DC=vis,DC=net",
                    "OU=FNQ,DC=vis,DC=net",

                };

                // Create a list to store objects with attributes from all searches
                List<Dictionary<string, object>> objectsWithAttributes = new List<Dictionary<string, object>>();

                foreach (string container in containers)
                {
                    // Create a directory entry for connecting to Active Directory for each location
                    DirectoryEntry entry = new DirectoryEntry($"LDAP://{server}/{container}", username, password);

                    // Create a directory searcher for each location
                    DirectorySearcher searcher = new DirectorySearcher(entry);

                    // Apply the filter with samAccountName parameter for user objects in each location
                    searcher.Filter = $"(&(objectClass=user)(sAMAccountName={samAccountName}))";

                    // Set the attributes to be retrieved for each searcher
                    string[] attributesToLoad = new string[]
                    {
                        "accountExpires", "displayName", "distinguishedName", "Dn",
                        "EQCentreCode", "EQIdentityType", "EQUniqueID", "extensionAttribute10",
                        "extensionAttribute13", "info", "lastLogon", "lockoutTime", "logonCount",
                        "mail", "pwdlastset", "sAMAccountName", "title", "userAccountControl",
                        "whenChanged", "whenCreated"
                    };
                    searcher.PropertiesToLoad.AddRange(attributesToLoad);

                    // Perform the search and retrieve the results for each location
                    SearchResultCollection results = searcher.FindAll();

                    // Process results for each location
                    foreach (SearchResult result in results)
                    {
                        DirectoryEntry directoryEntry = result.GetDirectoryEntry();
                        Dictionary<string, object> objectAttributes = new Dictionary<string, object>();
                        foreach (string attributeName in searcher.PropertiesToLoad)
                        {
                            objectAttributes[attributeName] = directoryEntry.Properties.Contains(attributeName)
                                ? directoryEntry.Properties[attributeName][0]
                                : null;
                        }
                        objectsWithAttributes.Add(objectAttributes);
                    }
                }

                return new JsonResult(new { success = true, objectsWithSamAccountName = objectsWithAttributes });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, message = $"Error: {ex.Message}" });
            }
        }
    }
}
