using System.DirectoryServices.Protocols;

public class LdapService
{
    private readonly LdapConnection _ldapConnection;

    public LdapService(IConfiguration configuration)
    {
        var ldapConfig = configuration.GetSection("LDAP");
        var ldapServer = ldapConfig["Server"];
        var ldapPort = int.Parse(ldapConfig["Port"]);
        var ldapUsername = ldapConfig["Username"];
        var ldapPassword = ldapConfig["Password"];

        _ldapConnection = new LdapConnection(new LdapDirectoryIdentifier(ldapServer, ldapPort));
        _ldapConnection.Credential = new System.Net.NetworkCredential(ldapUsername, ldapPassword);
    }

    public bool TestConnection()
    {
        try
        {
            _ldapConnection.Bind();
            return true; // Connection successful
        }
        catch (LdapException)
        {
            return false; // Connection failed
        }
        finally
        {
            _ldapConnection.Dispose(); // Dispose the connection
        }
    }

    // Add other methods for LDAP operations like authentication, searching, etc.
}
