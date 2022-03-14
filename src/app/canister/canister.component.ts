import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateCategory, GetStateData } from 'procon-ip/lib/get-state-data';
import { Canister } from './Canister';

@Component({
  selector: 'app-canister',
  templateUrl: './canister.component.html',
  styleUrls: ['./canister.component.scss']
})
export class CanisterComponent implements OnInit, OnDestroy {

  @Input() edit: boolean;

  canisters: Canister[] = [];

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
    const canisters = data.getDataObjectsByCategory(GetStateCategory.CANISTER);
    const consumptions = data.getDataObjectsByCategory(GetStateCategory.CANISTER_CONSUMPTION);
    canisters.forEach(canister => {
      const consumption = consumptions[canister.categoryId];
      if (this.canisters[canister.categoryId]) {
        canister.forFields(field => {
          const existingData = this.canisters[canister.categoryId].filling;
          if (canister[field] !== existingData[field]) {
            this.canisters[canister.categoryId] = new Canister(
              canister,
              consumption,
              data.sysInfo,
              this.canisters[canister.categoryId].isHidden(),
            );
            return;
          }
        });
        consumption.forFields(field => {
          const existingData = this.canisters[canister.categoryId].consumption;
          if (consumption[field] !== existingData[field]) {
            this.canisters[canister.categoryId] = new Canister(
              canister,
              consumption,
              data.sysInfo,
              this.canisters[canister.categoryId].isHidden(),
            );
            return;
          }
        });
      } else {
        this.canisters[canister.categoryId] = new Canister(
          canister,
          consumption,
          data.sysInfo,
        );
      }
    });
  }
}
