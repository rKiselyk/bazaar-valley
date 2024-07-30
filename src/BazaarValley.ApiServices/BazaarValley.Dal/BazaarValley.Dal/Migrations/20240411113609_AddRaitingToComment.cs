using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BazaarValley.Dal.Migrations
{
    /// <inheritdoc />
    public partial class AddRaitingToComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Ratings",
                table: "ItemsComments",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ratings",
                table: "ItemsComments");
        }
    }
}
