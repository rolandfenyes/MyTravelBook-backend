import { Component, Input, OnInit } from '@angular/core';
import { Outgoing } from '../model/outgoing';

@Component({
  selector: 'app-outgoing-card',
  templateUrl: './outgoing-card.component.html',
  styleUrls: ['./outgoing-card.component.css']
})
export class OutgoingCardComponent implements OnInit {

  @Input()
  outgoing!: Outgoing;

  constructor() { }

  ngOnInit() {
  }

}
