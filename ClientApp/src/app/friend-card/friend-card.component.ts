import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

  @Input()
  user!: User;

  @Input()
  isInviation!: boolean;

  titleType!: string;

  constructor() { }

  ngOnInit(): void {
    if (this.isInviation) {
      this.titleType = "Send invitation"
    } else {
      this.titleType = "Remove from party"
    }
    
  }

}
