import { Component, Input, OnInit, Optional } from '@angular/core';
import { Electrode } from './electrode/electrode';
import { ElectrodeService } from './electrode.service';
import { ActionsService, IAction } from '../actions.service';

@Component({
  selector: 'app-electrodes',
  templateUrl: './electrodes.component.html',
  styleUrls: ['./electrodes.component.scss']
})
export class ElectrodesComponent {
  electrodes: Electrode[];

  constructor(
    public electrodeService: ElectrodeService,
  ) {
    this.electrodes = electrodeService.getListObjects();
  }
}
