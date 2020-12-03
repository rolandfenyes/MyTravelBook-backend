import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../model/trip';
import { TripDTO } from '../my-trips-page/my-trips-page.component';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input()
  trip!: TripDTO;
  
  constructor() { }

  ngOnInit() {
  }

}
