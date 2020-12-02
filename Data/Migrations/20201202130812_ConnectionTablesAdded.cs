using Microsoft.EntityFrameworkCore.Migrations;

namespace MyTravelBook.Data.Migrations
{
    public partial class ConnectionTablesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FriendshipConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    FriendId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendshipConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FriendshipConnectionTable_AspNetUsers_FriendId",
                        column: x => x.FriendId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FriendshipConnectionTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TripAccommodationConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripID = table.Column<int>(nullable: true),
                    AccommodationID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripAccommodationConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripAccommodationConnectionTable_Accommodations_AccommodationID",
                        column: x => x.AccommodationID,
                        principalTable: "Accommodations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TripAccommodationConnectionTable_Trips_TripID",
                        column: x => x.TripID,
                        principalTable: "Trips",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TripExpenseConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripID = table.Column<int>(nullable: true),
                    ExpenseID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripExpenseConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripExpenseConnectionTable_Expenses_ExpenseID",
                        column: x => x.ExpenseID,
                        principalTable: "Expenses",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TripExpenseConnectionTable_Trips_TripID",
                        column: x => x.TripID,
                        principalTable: "Trips",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TripTravelConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripID = table.Column<int>(nullable: true),
                    TravelID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripTravelConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripTravelConnectionTable_Travels_TravelID",
                        column: x => x.TravelID,
                        principalTable: "Travels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TripTravelConnectionTable_Trips_TripID",
                        column: x => x.TripID,
                        principalTable: "Trips",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserAccommodationConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    AccommodationID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccommodationConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserAccommodationConnectionTable_Accommodations_AccommodationID",
                        column: x => x.AccommodationID,
                        principalTable: "Accommodations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserAccommodationConnectionTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserExpenseConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    ExpenseID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserExpenseConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserExpenseConnectionTable_Expenses_ExpenseID",
                        column: x => x.ExpenseID,
                        principalTable: "Expenses",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserExpenseConnectionTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTravelConnectionTable",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    TravelID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTravelConnectionTable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserTravelConnectionTable_Travels_TravelID",
                        column: x => x.TravelID,
                        principalTable: "Travels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserTravelConnectionTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendshipConnectionTable_FriendId",
                table: "FriendshipConnectionTable",
                column: "FriendId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendshipConnectionTable_UserId",
                table: "FriendshipConnectionTable",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TripAccommodationConnectionTable_AccommodationID",
                table: "TripAccommodationConnectionTable",
                column: "AccommodationID");

            migrationBuilder.CreateIndex(
                name: "IX_TripAccommodationConnectionTable_TripID",
                table: "TripAccommodationConnectionTable",
                column: "TripID");

            migrationBuilder.CreateIndex(
                name: "IX_TripExpenseConnectionTable_ExpenseID",
                table: "TripExpenseConnectionTable",
                column: "ExpenseID");

            migrationBuilder.CreateIndex(
                name: "IX_TripExpenseConnectionTable_TripID",
                table: "TripExpenseConnectionTable",
                column: "TripID");

            migrationBuilder.CreateIndex(
                name: "IX_TripTravelConnectionTable_TravelID",
                table: "TripTravelConnectionTable",
                column: "TravelID");

            migrationBuilder.CreateIndex(
                name: "IX_TripTravelConnectionTable_TripID",
                table: "TripTravelConnectionTable",
                column: "TripID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccommodationConnectionTable_AccommodationID",
                table: "UserAccommodationConnectionTable",
                column: "AccommodationID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccommodationConnectionTable_UserId",
                table: "UserAccommodationConnectionTable",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExpenseConnectionTable_ExpenseID",
                table: "UserExpenseConnectionTable",
                column: "ExpenseID");

            migrationBuilder.CreateIndex(
                name: "IX_UserExpenseConnectionTable_UserId",
                table: "UserExpenseConnectionTable",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTravelConnectionTable_TravelID",
                table: "UserTravelConnectionTable",
                column: "TravelID");

            migrationBuilder.CreateIndex(
                name: "IX_UserTravelConnectionTable_UserId",
                table: "UserTravelConnectionTable",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FriendshipConnectionTable");

            migrationBuilder.DropTable(
                name: "TripAccommodationConnectionTable");

            migrationBuilder.DropTable(
                name: "TripExpenseConnectionTable");

            migrationBuilder.DropTable(
                name: "TripTravelConnectionTable");

            migrationBuilder.DropTable(
                name: "UserAccommodationConnectionTable");

            migrationBuilder.DropTable(
                name: "UserExpenseConnectionTable");

            migrationBuilder.DropTable(
                name: "UserTravelConnectionTable");
        }
    }
}
