import { Component, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateData, GetStateDataSysInfo } from 'procon-ip';
import { RelaysService } from '../relays/relays.service';

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
    public relayService: RelaysService,
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
