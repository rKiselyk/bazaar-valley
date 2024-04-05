using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BazaarValley.Dal.Migrations
{
    /// <inheritdoc />
    public partial class AddIsPrimryField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPrimary",
                table: "CategoryFields",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrimary",
                table: "CategoryFields");
        }
    }
}
