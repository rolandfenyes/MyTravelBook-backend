import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTripPageComponent } from './new-trip-page.component';

describe('NewTripPageComponent', () => {
  let component: NewTripPageComponent;
  let fixture: ComponentFixture<NewTripPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTripPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
