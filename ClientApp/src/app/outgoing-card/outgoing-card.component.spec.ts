import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingCardComponent } from './outgoing-card.component';

describe('OutgoingCardComponent', () => {
  let component: OutgoingCardComponent;
  let fixture: ComponentFixture<OutgoingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
