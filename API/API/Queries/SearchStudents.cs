public static class QueryStudents
{
    public const string SearchStudentsQuery = @"
        SELECT TOP 100 [LionName],[ElephantPreferredName],[TigerSurname],[EQID],[ZebraGUID],[GiraffeSPID],[MonkeyID],[Status],
            [SSPRStatus],convert(char(11), [DateOfBirth], 103) AS DateOfBirth,
            [Gender],convert(char(11), [StartDate], 103) AS StartDate,
            convert(char(11), [EndDate],103) AS EndDate, [CentreCode],[IsSilentUser] 
        FROM [AnimalSyncService].[dbo].[AnimalMetaverse]
        WHERE";
}