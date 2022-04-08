import { Component, Input, Optional } from '@angular/core';
import { Electrode } from './electrode/electrode';
import { ElectrodeService } from './electrode.service';

@Component({
  selector: 'app-electrodes',
  templateUrl: './electrodes.component.html',
  styleUrls: ['./electrodes.component.scss']
})
export class ElectrodesComponent {
  @Input() @Optional() showHiddenItems = false;
  @Input() @Optional() editable = false;

  electrodes: Electrode[];

  constructor(
    public electrodeService: ElectrodeService,
  ) {
    this.electrodes = electrodeService.getListObjects()
  }
}
