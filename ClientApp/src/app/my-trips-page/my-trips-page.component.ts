import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDTO } from '../model/dtos';
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
