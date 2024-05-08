public static class QueryStaff
{
    public const string SearchStaffQuery = @"
        SELECT TOP 100 [McNuggets],[McFlurry],[BigMac],[McRib],[McChicken],[McDouble],[McFish],[McWrap],[McMuffin],[HappyMeal] 
        FROM [McDonaldsDB].[dbo].[EmployeeTable]
        WHERE;
}