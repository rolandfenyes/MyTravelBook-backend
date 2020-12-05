import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDTO, UserIdDto } from '../model/dtos';
import { Trip } from '../model/trip';
import { MyAccount, User } from '../model/user';
import { TripService } from '../services/TripService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-my-trips-page',
  templateUrl: './my-trips-page.component.html',
  styleUrls: ['./my-trips-page.component.css']
})
export class MyTripsPageComponent implements OnInit {

  myTripsInProgress!: Array<TripDTO>;
  userID!: UserIdDto;
  //myFutureTrips!: Array<Trip>;
  public myFutureTrips: TripDTO[];
  tripService: TripService;
  userService: UserService;

  constructor(private router: Router, http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.tripService = new TripService(http, baseUrl);
    this.userService = new UserService(http, baseUrl);
    this.myTripsInProgress = new Array<TripDTO>();
  }

  ngOnInit(): void {
    //this.myTripsInProgress = MyAccount.getInstance().user.myTripsInProgress;
    //this.myFutureTrips = MyAccount.getInstance().user.myTrips; 
    console.log(MyAccount.getInstance().userId);
    if (MyAccount.getInstance().userId === null) {
      this.userService.getUser().then(u => {
        this.downloadTrips();
      })
    } else {
      this.downloadTrips();
    }
    
  }

  downloadTrips() {
    var now = new Date();
    this.tripService.getMyTrips().then(trips => {
      this.myFutureTrips = trips;
      console.log(this.myFutureTrips);
      if (trips.length > 0) {
        trips.forEach(element => {
          if (new Date(element.startDate) < now && new Date(element.endDate) > now) {
            this.myTripsInProgress.push(element);
          }
        });
      }
    });
  }

  navigateToCustomizeById(id: number) {
    this.router.navigateByUrl('customize-trip/' + id.toString());
  }

}
