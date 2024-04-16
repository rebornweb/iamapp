using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpGet("UserInfo")]
        [Authorize]
        public IActionResult GetUserInfo()
        {
            // Check if the user is authenticated
            if (User.Identity.IsAuthenticated)
            {
                // Get the authenticated user's identity
                ClaimsIdentity identity = User.Identity as ClaimsIdentity;

                // Get user's name
                string username = identity?.Name;

                // Get user's claims (if needed)
                var userClaims = identity?.Claims;

                // You can return any information you need about the authenticated user
                return Ok(new { Username = username, Claims = userClaims });
            }
            else
            {
                // User is not authenticated
                return Unauthorized("User is not authenticated.");
            }
        }
    }
}
