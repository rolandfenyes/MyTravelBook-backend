import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../model/trip';
import { MyAccount } from '../model/user';

@Component({
  selector: 'app-my-trips-page',
  templateUrl: './my-trips-page.component.html',
  styleUrls: ['./my-trips-page.component.css']
})
export class MyTripsPageComponent implements OnInit {

  myTripsInProgress!: Array<Trip>;
  //myFutureTrips!: Array<Trip>;
  public myFutureTrips: TripDTO[];

  constructor(private router: Router, http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    http.get<TripDTO[]>(baseUrl + 'api/trip').subscribe(result => {
      this.myFutureTrips = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
    //this.myTripsInProgress = MyAccount.getInstance().user.myTripsInProgress;
    //this.myFutureTrips = MyAccount.getInstance().user.myTrips; 
  }

  navigateToCustomizeById(item: Trip) {
    var id = MyAccount.getInstance().user.myTrips.indexOf(item);
    this.router.navigateByUrl('customize-trip/' + id.toString());
  }

}

export interface TripDTO {
  id: number;
  tripName: string;
  startDate: Date;
  endDate: Date;
  organiserID: string;
  organiserName: string;
  travelDTOs: TravelDTO[];
  accommodationDTOs: AccommodationDTO[];
  participants: UserDTO[];
  expenses: ExpenseDTO[];
}

interface TravelDTO {
  id: number;
  travelType: number;
  startPoint: string;
  destination: string;
  pricePerPerson: number;
  participants: UserDTO[];
  distance: number;
  consumption: number;
  fuelPrice: number;
  vignettePrice: number;
  ticketPricePerPerson: number;
  seatReservationPerPerson: number;
  tripID: number;
}

interface AccommodationDTO {
  id: number;
  accommodationName: string;
  accommodationLocation: string;
  nights: number;
  accommodationType: number;
  price: number;
  participants: UserDTO[];
  tripID: number;
}

interface UserDTO {
  id: string;
  nickname: string;
  birth: Date;
}

interface ExpenseDTO {
  id: number;
  expenseName: string;
  location: string;
  price: number;
  expenseType: number;
  applicationUserDTOs: UserDTO[];
  tripID: number;
}