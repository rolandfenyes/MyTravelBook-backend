import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../model/dtos';
import { MyAccount, User } from '../model/user';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  myFriends!: UserDTO[];
  userId!: string;
  userService: UserService;
  friendName: string;

  constructor(private router: Router, private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    this.userService = new UserService(http, baseUrl);
    this.userService.getUser().then(u => this.userId = u.id);
  }

  ngOnInit(): void {
    this.myFriends = [];
    this.userService.getFriends().then( f => this.myFriends = f);
  }

  addFriend() {
    this.userService.addFriend(this.friendName).then(friend => {
      var friendDto = new UserDTO();
      friendDto.nickname = this.friendName;
      this.myFriends.push(friendDto);
    })
  }

}
