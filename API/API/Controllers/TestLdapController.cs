using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TestLdapController : ControllerBase
{
    private readonly LdapService _ldapService;

    public TestLdapController(LdapService ldapService)
    {
        _ldapService = ldapService;
    }

    [HttpGet("test-connection")]
    public IActionResult TestConnection()
    {
        bool isConnected = _ldapService.TestConnection();

        if (isConnected)
        {
            return Ok("LDAP connection is successful.");
        }
        else
        {
            return StatusCode(500, "Failed to establish LDAP connection.");
        }
    }
}
