-- GetAnimalById.sql

SELECT TOP 100 
    [LionName],
    [ElephantPreferredName],
    [TigerSurname],
    [AnimalNumber],
    [ZebraGUID],
    [GiraffeSPID],
    [MonkeyID],
    [AnimalStatus],
    [AnimalSSPRStatus],
    convert(char(11), [AnimalDateofBirth], 103) AS AnimalDateofBirth,
    [AnimalGender],
    convert(char(11), [AnimalStartDate], 103) AS AnimalStartDate,
    convert(char(11), [AnimalEndDate], 103) AS AnimalEndDate,
    [AnimalCentreCode],
    [AnimalIsSilentUser]
FROM 
    [AnimalSyncService].[dbo].[AnimalMetaverse]
WHERE 
    [ZebraGUID] = @ID
ORDER BY 
    [TigerSurname];