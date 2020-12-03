import { Component, Input, OnInit } from '@angular/core';
import { Travelling, TravelType } from '../model/trip';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.css']
})
export class TravelCardComponent implements OnInit {

  @Input()
  travel!: Travelling;

  id!: string;

  isToggled = false;

  constructor() { }

  ngOnInit(): void {
    if (this.travel.travelType == TravelType.CAR) {
      document.getElementById('detailsCar'+this.travel.id).classList.remove('hidden');
    }
  }

}
