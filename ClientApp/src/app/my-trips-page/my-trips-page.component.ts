import { Component, OnInit } from '@angular/core';
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
  myFutureTrips!: Array<Trip>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.myTripsInProgress = MyAccount.getInstance().user.myTripsInProgress;
    this.myFutureTrips = MyAccount.getInstance().user.myTrips; 
  }

  navigateToCustomizeById(item: Trip) {
    var id = MyAccount.getInstance().user.myTrips.indexOf(item);
    this.router.navigateByUrl('customize-trip/' + id.toString());
  }

}
