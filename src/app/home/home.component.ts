import { Component, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateData } from 'procon-ip/lib/get-state-data';
import { RelayService } from '../relay.service';
import { Relay } from '../relays/relay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: GetStateData;
  // relays: Relay[];

  constructor(
    private _getStateService: GetStateService,
    public relayService: RelayService,
  ) {
  }

  ngOnInit() {
    // this.relays = this._relayService.getRelays();
    // this._getStateService.registerCallback(data => {
    //   this.data = data;
    // });
  }
}
