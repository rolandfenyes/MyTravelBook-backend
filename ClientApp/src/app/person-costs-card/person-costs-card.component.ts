import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-person-costs-card',
  templateUrl: './person-costs-card.component.html',
  styleUrls: ['./person-costs-card.component.css']
})
export class PersonCostsCardComponent implements OnInit {

  @Input()
  user!: User;
  
  constructor() { }

  ngOnInit() {
  }

}
