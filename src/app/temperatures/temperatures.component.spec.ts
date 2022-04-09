import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturesComponent } from './temperatures.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TemperaturesComponent', () => {
  let component: TemperaturesComponent;
  let fixture: ComponentFixture<TemperaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ TemperaturesComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
