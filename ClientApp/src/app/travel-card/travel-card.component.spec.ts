import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCardComponent } from './travel-card.component';

describe('TravelCardComponent', () => {
  let component: TravelCardComponent;
  let fixture: ComponentFixture<TravelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
