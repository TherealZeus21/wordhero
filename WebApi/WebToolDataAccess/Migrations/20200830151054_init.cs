using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebToolDataAccess.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WordHeroes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    IsFavourite = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    SpidegramData = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordHeroes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentResults",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentName = table.Column<string>(nullable: true),
                    UpdateTime = table.Column<DateTime>(nullable: false),
                    GroupName = table.Column<string>(nullable: true),
                    WordHeroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentResults_WordHeroes_WordHeroId",
                        column: x => x.WordHeroId,
                        principalTable: "WordHeroes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WordHeroConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsPublic = table.Column<bool>(nullable: false),
                    Preferences = table.Column<string>(nullable: true),
                    LessonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordHeroConfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordHeroConfigs_WordHeroes_LessonId",
                        column: x => x.LessonId,
                        principalTable: "WordHeroes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Words",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    WordHeroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Words", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Words_WordHeroes_WordHeroId",
                        column: x => x.WordHeroId,
                        principalTable: "WordHeroes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WordResults",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Word = table.Column<string>(nullable: true),
                    UseCount = table.Column<int>(nullable: false),
                    StudentResultId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordResults_StudentResults_StudentResultId",
                        column: x => x.StudentResultId,
                        principalTable: "StudentResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentResults_WordHeroId",
                table: "StudentResults",
                column: "WordHeroId");

            migrationBuilder.CreateIndex(
                name: "IX_WordHeroConfigs_LessonId",
                table: "WordHeroConfigs",
                column: "LessonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WordResults_StudentResultId",
                table: "WordResults",
                column: "StudentResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Words_WordHeroId",
                table: "Words",
                column: "WordHeroId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WordHeroConfigs");

            migrationBuilder.DropTable(
                name: "WordResults");

            migrationBuilder.DropTable(
                name: "Words");

            migrationBuilder.DropTable(
                name: "StudentResults");

            migrationBuilder.DropTable(
                name: "WordHeroes");
        }
    }
}
