import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaysComponent } from './relays.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RelaysComponent', () => {
  let component: RelaysComponent;
  let fixture: ComponentFixture<RelaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ RelaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
