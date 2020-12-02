using Microsoft.EntityFrameworkCore.Migrations;

namespace MyTravelBook.Data.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OutgoingName",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "OutgoingType",
                table: "Expenses");

            migrationBuilder.AddColumn<string>(
                name: "ExpenseName",
                table: "Expenses",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExpenseType",
                table: "Expenses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TripUserConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripID = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripUserConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripUserConnectionTable_Trips_TripID",
                        column: x => x.TripID,
                        principalTable: "Trips",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TripUserConnectionTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TripUserConnectionTable_TripID",
                table: "TripUserConnectionTable",
                column: "TripID");

            migrationBuilder.CreateIndex(
                name: "IX_TripUserConnectionTable_UserId",
                table: "TripUserConnectionTable",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TripUserConnectionTable");

            migrationBuilder.DropColumn(
                name: "ExpenseName",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "ExpenseType",
                table: "Expenses");

            migrationBuilder.AddColumn<string>(
                name: "OutgoingName",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OutgoingType",
                table: "Expenses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
