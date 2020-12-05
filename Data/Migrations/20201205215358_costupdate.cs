using Microsoft.EntityFrameworkCore.Migrations;

namespace MyTravelBook.Data.Migrations
{
    public partial class costupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Costs",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TravelCost = table.Column<double>(nullable: false),
                    AccommodationCost = table.Column<double>(nullable: false),
                    ExpenseCost = table.Column<double>(nullable: false),
                    TotalCost = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Costs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TripUserCostConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(nullable: true),
                    TripID = table.Column<int>(nullable: false),
                    CostID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripUserCostConnectionTable", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Costs");

            migrationBuilder.DropTable(
                name: "TripUserCostConnectionTable");
        }
    }
}
