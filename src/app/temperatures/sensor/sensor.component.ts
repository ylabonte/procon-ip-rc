import { Component, Input, OnInit } from '@angular/core';
import { GetStateDataObject } from 'procon-ip';
import {
  IListObjectComponentState,
  ListObjectComponent,
} from '../../object-list/list-object.directive';
import { Sensor } from './sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent extends ListObjectComponent implements OnInit {
  // @Input() listItem: Sensor;
  // @Input() state: IListObjectComponentState;
  data: GetStateDataObject;

  ngOnInit() {
    this.data = this.listItem.dataObject;
  }
}
