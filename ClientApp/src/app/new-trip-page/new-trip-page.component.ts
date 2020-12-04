import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDTO } from '../model/dtos';
import { Trip } from '../model/trip';
import { MyAccount, User } from '../model/user';
import { TripService } from '../services/TripService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-new-trip-page',
  templateUrl: './new-trip-page.component.html',
  styleUrls: ['./new-trip-page.component.scss']
})
export class NewTripPageComponent implements OnInit {

  tripName!: string;
  travelStart!: string;
  travelEnd!: string;

  myFriends!: Array<User>;
  invitedFriends!: Array<User>;
  minDate!: Date;
  tripService: TripService;

  constructor(private router: Router, private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    this.tripService = new TripService(http, baseUrl);
    var userService = new UserService(http, baseUrl);
    userService.getUser();
  }

  ngOnInit(): void {
    this.myFriends = new Array<User>();
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
    
    var tripDto = new TripDTO();
    tripDto.tripName = this.tripName;
    tripDto.startDate = new Date(this.travelStart);
    tripDto.endDate = new Date(this.travelEnd);
    tripDto.organiserID = MyAccount.getInstance().userId;

    var id: number;
    this.tripService.addNewTrip(tripDto).then(tripId => {
      console.log(id);
      this.router.navigateByUrl('customize-trip/'+ tripId.toString());
    });
    
    

  }

}
