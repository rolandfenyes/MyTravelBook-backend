import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeTripPageComponent } from './customize-trip-page.component';

describe('CustomizeTripPageComponent', () => {
  let component: CustomizeTripPageComponent;
  let fixture: ComponentFixture<CustomizeTripPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeTripPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
