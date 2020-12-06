import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDTO, UserDTO } from '../model/dtos';
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

  myFriends!: UserDTO[];
  invitedFriends!: UserDTO[];
  minDate!: Date;
  tripService: TripService;
  userService: UserService;
  userId!: string;
  selected: {startDate: Date, endDate: Date};

  constructor(private router: Router, private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    this.tripService = new TripService(http, baseUrl);
    this.userService = new UserService(http, baseUrl);
    this.userService.getUser().then(u => this.userId = u.id);
  }

  ngOnInit(): void {
    this.myFriends = [];
    this.invitedFriends = [];
    this.minDate = new Date();
    if (MyAccount.getInstance().userId == null) {
      this.userService.getUser().then(userId => {
        MyAccount.getInstance().userId = userId.id;
        this.userService.getFriends().then( f => this.myFriends = f);
      })
    }
    else {
      this.userService.getFriends().then( f => this.myFriends = f);
    }
  }

  inviteFriend(friend: UserDTO) {
    this.invitedFriends.push(friend);
    const index = this.myFriends.indexOf(friend, 0);
    this.myFriends.splice(index, 1);
  }

  removeFriend(friend: UserDTO) {
    const index = this.invitedFriends.indexOf(friend, 0);
    this.invitedFriends.splice(index, 1);
    this.myFriends.push(friend);
  }

  saveTripAndGoToCustomise() {
    var tripDto = new TripDTO();
    tripDto.tripName = this.tripName;
    tripDto.startDate = new Date(this.travelStart);
    tripDto.endDate = new Date(this.travelEnd);
    tripDto.organiserID = this.userId;
    tripDto.participants = this.invitedFriends;

    var id: number;
    this.tripService.addNewTrip(tripDto).then(tripId => {
      this.router.navigateByUrl('customize-trip/'+ tripId.toString());
    });

  }

}
