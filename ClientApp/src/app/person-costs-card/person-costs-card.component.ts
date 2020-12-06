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
  travels: number;
  accommodations: number;
  outgoings: number;
  total: number;
  
  constructor() { }

  ngOnInit() {
    this.travels = Math.round(this.user.travelCost * 100) / 100;
    this.accommodations = Math.round(this.user.accommodationCost * 100) / 100;
    this.outgoings = Math.round(this.user.outgoingsCost * 100) / 100;
    this.total = Math.round(this.user.totalCost * 100) / 100;
  }

}
