public static class QueryStudents
{
    public const string SearchStudentsQuery = @"
        SELECT TOP 100 [givenName],[idmPreferredName],[sn],[idmEQID],[idmGUID],[idmSPID],[uid],[idmStatus],
            [idmSSPRStatus],convert(char(11), [idmDateofBirth], 103) AS idmDateofBirth,
            [idmGender],convert(char(11), [idmStartDate], 103) AS idmStartDate,
            convert(char(11), [idmEndDate],103) AS idmEndDate, [idmCentreCode],[idmIsSilentUser] 
        FROM [FIMSynchronizationService].[dbo].[mms_metaverse]
        WHERE";
}
