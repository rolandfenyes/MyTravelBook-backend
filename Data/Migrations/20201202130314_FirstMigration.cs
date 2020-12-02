using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyTravelBook.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Birth",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Nickname",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Accommodations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccommodationName = table.Column<string>(nullable: true),
                    AccommodationLocation = table.Column<string>(nullable: true),
                    Nights = table.Column<int>(nullable: false),
                    AccommodationType = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accommodations", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OutgoingName = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    OutgoingType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Travels",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TravelType = table.Column<int>(nullable: false),
                    StartPoint = table.Column<string>(nullable: true),
                    Destination = table.Column<string>(nullable: true),
                    PricePerPeson = table.Column<double>(nullable: false),
                    Distance = table.Column<double>(nullable: false),
                    Consumption = table.Column<double>(nullable: false),
                    FuelPrice = table.Column<double>(nullable: false),
                    VignettePrice = table.Column<double>(nullable: false),
                    TicketPricePerPeson = table.Column<double>(nullable: false),
                    SeatReservationPerPerson = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Travels", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripName = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    OrganiserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Trips_AspNetUsers_OrganiserId",
                        column: x => x.OrganiserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trips_OrganiserId",
                table: "Trips",
                column: "OrganiserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accommodations");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Travels");

            migrationBuilder.DropTable(
                name: "Trips");

            migrationBuilder.DropColumn(
                name: "Birth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Nickname",
                table: "AspNetUsers");
        }
    }
}
