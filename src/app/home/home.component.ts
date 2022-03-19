import { Component, EventEmitter, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateData, GetStateCategory, GetStateDataObject, GetStateDataSysInfo } from 'procon-ip';
import { RelayService } from '../relays/relay.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: GetStateData;
  sysInfoTableData: GetStateDataSysInfo;
  temperatures: Observable<GetStateDataObject[]>;

  constructor(
    private _getStateService: GetStateService,
    public relayService: RelayService,
  ) {
  }

  ngOnInit() {
    this._getStateService.getData().subscribe(data => {
      this.data = data;
      if (this.data) {
        this.sysInfoTableData = this.data.sysInfo;
        this.temperatures = of(this.data.getDataObjectsByCategory(GetStateCategory.TEMPERATURES));
      }
    });
  }
}
