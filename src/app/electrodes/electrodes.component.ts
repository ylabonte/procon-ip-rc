import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateCategory, GetStateData } from 'procon-ip';
import { Electrode } from './Electrode';

@Component({
  selector: 'app-electrodes',
  templateUrl: './electrodes.component.html',
  styleUrls: ['./electrodes.component.scss']
})
export class ElectrodesComponent implements OnInit, OnDestroy {

  @Input() edit: boolean;

  electrodes: Electrode[] = [];

  private _callbackIdx: number;

  constructor(
    private _getStateService: GetStateService,
  ) { }

  ngOnInit(): void {
    this._callbackIdx = this._getStateService.registerCallback(data => { this.prepareData(data); });
  }

  ngOnDestroy() {
    this._getStateService.removeCallback(this._callbackIdx);
  }

  prepareData(data: GetStateData) {
    const electrodes = data.getDataObjectsByCategory(GetStateCategory.ELECTRODES);
    electrodes.forEach(electrode => {
      if (this.electrodes[electrode.categoryId]) {
        electrode.forFields(field => {
          const existingData = this.electrodes[electrode.categoryId].data;
          if (electrode[field] !== existingData[field]) {
            this.electrodes[electrode.categoryId] = new Electrode(
              electrode,
              data.sysInfo,
              this.electrodes[electrode.categoryId].isHidden(),
            );
            return;
          }
        });
      } else {
        this.electrodes[electrode.categoryId] = new Electrode(electrode, data.sysInfo);
      }
    });
  }
}
