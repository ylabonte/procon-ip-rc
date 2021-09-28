import { Component, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';

@Component({
  selector: 'app-relays',
  templateUrl: './relays.component.html',
  styleUrls: ['./relays.component.scss']
})
export class RelaysComponent implements OnInit {

  constructor(
    private getStateService: GetStateService,
  ) { }

  ngOnInit(): void {
  }

}
