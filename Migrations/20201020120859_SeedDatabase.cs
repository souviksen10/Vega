using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO Makes (NAME) VALUES ('Make1'), ('Make2'), ('Make3')

                DECLARE @make1_id INT,
                        @make2_id INT,
                        @make3_id INT
                
                SET @make1_id = (SELECT Id FROM MAKES WHERE Name = 'Make1')
                SET @make2_id = (SELECT Id FROM MAKES WHERE Name = 'Make2')
                SET @make3_id = (SELECT Id FROM MAKES WHERE Name = 'Make3')

                INSERT INTO Models (NAME, MAKEID) VALUES 
                ('Make1-ModelA',@make1_id), ('Make1-ModelB',@make1_id),('Make1-ModelC',@make1_id),
                ('Make2-ModelA',@make2_id),('Make2-ModelB',@make2_id),('Make2-ModelC',@make2_id),
                ('Make3-ModelA',@make3_id),('Make3-ModelB',@make3_id),('Make3-ModelC',@make3_id)

            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM MAKES WHERE NAME IN ('Make1','Make2','Make3')");
        }
    }
}
