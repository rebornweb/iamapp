namespace API.Interfaces
{
    public interface IDatabaseService
    {
        List<T> ExecuteQuery<T>(string query, object parameters, string serverConnectionName);
    }

}
