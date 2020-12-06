import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../model/dtos';
import { MyAccount } from '../model/user';
import { TripService } from '../services/TripService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  nickName: string;
  birth: string;
  actualNickName: string;
  actualBirth: Date;
  userService: UserService;

  constructor(private router: Router, private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    this.userService = new UserService(http, baseUrl);
  }

  ngOnInit() {
    if (MyAccount.getInstance().userId == null) {
      this.userService.getUser().then(userID => {
        MyAccount.getInstance().userId = userID.id;
        this.userService.getUserDto().then( user => {
          this.actualNickName = user.nickname;
          this.actualBirth = user.birth;
        });
      });
    }
    
  }

  saveChanges() {
    if (this.nickName == null) {
      this.nickName = this.actualNickName;
    }
    if (this.birth == null) {
      this.birth = this.actualBirth.toString();
      console.log(this.birth);
    }
    this.userService.changeNickname(this.nickName, new Date(this.birth)).then(t => {
      document.getElementById('saveChangesButton').innerText = "Data saved!";
    });
  }

}
