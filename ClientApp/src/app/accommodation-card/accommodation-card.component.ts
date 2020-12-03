import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../model/trip';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent implements OnInit {

  @Input()
  accommodation!: Accommodation;

  constructor() { }

  ngOnInit() {
  }

}
