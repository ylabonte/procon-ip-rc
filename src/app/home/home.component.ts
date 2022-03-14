import { Component, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateData } from 'procon-ip/lib/get-state-data';
import { RelayService } from '../relays/relay.service';
import { GetStateDataSysInfo } from 'procon-ip/lib/get-state-data-sys-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: GetStateData;
  sysInfoTableData: GetStateDataSysInfo;

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
      }
    });
  }
}
