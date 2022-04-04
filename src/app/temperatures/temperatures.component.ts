import { Component } from '@angular/core';
import { GetStateCategory } from 'procon-ip';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})
export class TemperaturesComponent {
  category = GetStateCategory.TEMPERATURES;
}
