public static class QueryIdentityOverride
{
    public const string SearchIdentityOverrideQuery = @"SELECT TOP (10) convert (char(36),[idmGuid]) as idmGuid
            ,[givenName]
            ,[idmPreferredName]
            ,[sn]
            ,[idmStatus]
            ,[description]
            ,convert(char(11), [CreatedAt], 103) AS CreatedAt
            ,[Active]
            ,convert(char(11), [LastUpdated], 103) AS LastUpdated
            FROM [IAMSAS].[dbo].[Identity_Overrides] 
            Where ";
}
