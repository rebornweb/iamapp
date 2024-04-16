using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Cors;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class B2BController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public B2BController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("User")]
        public async Task<IActionResult> SearchUser(string searchValue)
        {
            try
            {
                // Get Azure AD settings from configuration
                string clientId = _configuration["AzureAD:ClientId"];
                string clientSecret = _configuration["AzureAD:ClientSecret"];
                string tenantId = _configuration["AzureAD:TenantId"];

                IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder
                    .Create(clientId)
                    .WithClientSecret(clientSecret)
                    .WithAuthority(new Uri($"https://login.microsoftonline.com/{tenantId}"))
                    .Build();

                var authResult = await confidentialClientApplication.AcquireTokenForClient(new[] { "https://graph.microsoft.com/.default" }).ExecuteAsync();

                var graphServiceClient = new GraphServiceClient(new DelegateAuthenticationProvider((requestMessage) =>
                {
                    requestMessage.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", authResult.AccessToken);
                    return Task.FromResult(0);
                }));

                var guestUser = await graphServiceClient.Users[$"{searchValue}@{tenantId}"].Request().GetAsync();

                return Ok(guestUser);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
