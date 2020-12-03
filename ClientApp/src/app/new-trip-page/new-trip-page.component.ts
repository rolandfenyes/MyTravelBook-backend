import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../model/trip';
import { MyAccount, User } from '../model/user';

@Component({
  selector: 'app-new-trip-page',
  templateUrl: './new-trip-page.component.html',
  styleUrls: ['./new-trip-page.component.scss']
})
export class NewTripPageComponent implements OnInit {

  tripName!: string;
  travelBetween!: string;

  myFriends!: Array<User>;
  invitedFriends!: Array<User>;
  minDate!: Date;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.myFriends = MyAccount.getInstance().user.friendsList;
    this.invitedFriends = new Array<User>();
    this.minDate = new Date();

    
  }

  inviteFriend(friend: User) {
    this.invitedFriends.push(friend);
    const index = this.myFriends.indexOf(friend, 0);
    this.myFriends.splice(index, 1);
  }

  removeFriend(friend: User) {
    const index = this.invitedFriends.indexOf(friend, 0);
    this.invitedFriends.splice(index, 1);
    this.myFriends.push(friend);
  }

  saveTripAndGoToCustomise() {
    //TODO save
    var startDate = new Date(this.travelBetween[0]);
    var trip = new Trip(this.tripName, startDate);
    var id = MyAccount.getInstance().user.addTrip(trip);
    this.router.navigateByUrl('customize-trip/'+ id.toString());
  }

}
