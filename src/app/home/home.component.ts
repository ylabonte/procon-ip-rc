import { Component, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateData } from 'procon-ip/lib/get-state-data';
import { RelayService } from '../relays/relay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: GetStateData;

  constructor(
    private _getStateService: GetStateService,
    public relayService: RelayService,
  ) {
  }

  ngOnInit() {
    this._getStateService.getData().subscribe(data => this.data = data);
  }
}
