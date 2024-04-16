using API.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;

namespace API.DataAccess
{
    public class DatabaseService : IDatabaseService
    {
        private readonly IConfiguration _configuration;

        public DatabaseService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<T> ExecuteQuery<T>(string query, object parameters, string serverConnectionName)
        {
            string connectionString = _configuration.GetConnectionString(serverConnectionName);
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                return connection.Query<T>(query, parameters).AsList();
            }
        }
    }
}
