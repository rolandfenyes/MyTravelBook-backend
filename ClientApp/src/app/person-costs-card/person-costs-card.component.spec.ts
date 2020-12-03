import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCostsCardComponent } from './person-costs-card.component';

describe('PersonCostsCardComponent', () => {
  let component: PersonCostsCardComponent;
  let fixture: ComponentFixture<PersonCostsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCostsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCostsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
