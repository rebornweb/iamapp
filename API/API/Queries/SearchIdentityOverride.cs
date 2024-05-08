public static class QueryIdentityOverride
{
    public const string SearchIdentityOverrideQuery = @"SELECT TOP (10) convert (char(36),[McGuid]) as McGuid
            ,[McGivenName]
            ,[McPreferredName]
            ,[McSurname]
            ,[McStatus]
            ,[McDescription]
            ,convert(char(11), [McCreatedAt], 103) AS McCreatedAt
            ,[McActive]
            ,convert(char(11), [McLastUpdated], 103) AS McLstUpdated
            FROM [McIAMSAS].[dbo].[McIdentity_Overrides] 
            WHERE ";
}