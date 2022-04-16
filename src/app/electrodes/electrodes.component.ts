import { Component, OnInit } from '@angular/core';
import { Electrode } from './electrode/electrode';
import { ElectrodeService } from './electrode.service';
import { GetStateDataSysInfo } from 'procon-ip';

@Component({
  selector: 'app-electrodes',
  templateUrl: './electrodes.component.html',
  styleUrls: ['./electrodes.component.scss']
})
export class ElectrodesComponent implements OnInit {
  electrodes: Electrode[];
  sysInfo: GetStateDataSysInfo;

  constructor(
    private _electrodeService: ElectrodeService,
  ) { }

  ngOnInit() {
    this.electrodes = this._electrodeService.getListObjects();
    this.sysInfo = this._electrodeService.getSysInfo();
  }
}
