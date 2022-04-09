import { Component, OnInit } from '@angular/core';
import { GetStateDataObject } from 'procon-ip';
import {
  ListObjectComponent,
} from '../../object-list/list-object.directive';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent extends ListObjectComponent implements OnInit {
  data: GetStateDataObject;

  ngOnInit() {
    this.data = this.listItem.dataObject;
  }
}
