using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_flow.Migrations
{
    public partial class UpdatedSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tasks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Due_date",
                table: "Tasks",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Tasks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql(
                """
                ALTER TABLE "Projects"
                ALTER COLUMN "ProjectProgress" TYPE integer
                USING NULLIF("ProjectProgress"::text, '')::integer;
                """);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Due_date",
                table: "Projects",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ProjectLeadId",
                table: "Projects",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Due_date",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Due_date",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ProjectLeadId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Projects");

            migrationBuilder.Sql(
                """
                ALTER TABLE "Projects"
                ALTER COLUMN "ProjectProgress" TYPE text
                USING "ProjectProgress"::text;
                """);
        }
    }
}