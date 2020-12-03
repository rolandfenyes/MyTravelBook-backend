import { Component, Input, OnInit } from '@angular/core';
import { TripDTO } from '../model/dtos';
import { Trip } from '../model/trip';

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
