import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripsPageComponent } from './my-trips-page.component';

describe('MyTripsPageComponent', () => {
  let component: MyTripsPageComponent;
  let fixture: ComponentFixture<MyTripsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTripsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
