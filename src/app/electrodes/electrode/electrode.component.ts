import { Component, Input, OnInit } from '@angular/core';
import { ListObjectComponent } from '../../object-list/list-object.directive';
import { Electrode } from './electrode';
import { GetStateDataObject, GetStateDataSysInfo } from 'procon-ip';

@Component({
  selector: 'app-electrode',
  templateUrl: './electrode.component.html',
  styleUrls: ['./electrode.component.scss']
})
export class ElectrodeComponent extends ListObjectComponent implements OnInit {
  @Input() electrode: Electrode;
  data: GetStateDataObject;
  sysInfo: GetStateDataSysInfo;

  ngOnInit() {
    this.data = this.electrode.dataObject;
    this.sysInfo = this.electrode.sysInfo;
  }
}
