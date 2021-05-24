using Microsoft.EntityFrameworkCore.Migrations;

namespace WebToolDataAccess.Migrations
{
    public partial class sharefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentResults_WordHeroes_WordHeroId",
                table: "StudentResults");


            migrationBuilder.DropColumn(
                name: "GroupName",
                table: "StudentResults");

            migrationBuilder.DropColumn(
                name: "WordHeroId",
                table: "StudentResults");

            migrationBuilder.AddColumn<int>(
                name: "WordHeroShareDataId",
                table: "StudentResults",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WordHeroShareData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    WordHeroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordHeroShareData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordHeroShareData_WordHeroes_WordHeroId",
                        column: x => x.WordHeroId,
                        principalTable: "WordHeroes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentResults_WordHeroShareDataId",
                table: "StudentResults",
                column: "WordHeroShareDataId");

            migrationBuilder.CreateIndex(
                name: "IX_WordHeroShareData_WordHeroId",
                table: "WordHeroShareData",
                column: "WordHeroId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentResults_WordHeroShareData_WordHeroShareDataId",
                table: "StudentResults",
                column: "WordHeroShareDataId",
                principalTable: "WordHeroShareData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentResults_WordHeroShareData_WordHeroShareDataId",
                table: "StudentResults");

            migrationBuilder.DropTable(
                name: "WordHeroShareData");

            migrationBuilder.DropIndex(
                name: "IX_StudentResults_WordHeroShareDataId",
                table: "StudentResults");

            migrationBuilder.DropColumn(
                name: "WordHeroShareDataId",
                table: "StudentResults");

            migrationBuilder.AddColumn<string>(
                name: "GroupName",
                table: "StudentResults",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WordHeroId",
                table: "StudentResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentResults_WordHeroId",
                table: "StudentResults",
                column: "WordHeroId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentResults_WordHeroes_WordHeroId",
                table: "StudentResults",
                column: "WordHeroId",
                principalTable: "WordHeroes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
