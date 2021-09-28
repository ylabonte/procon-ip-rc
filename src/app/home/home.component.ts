import { Component, OnInit } from '@angular/core';
import { GetStateService } from '../get-state.service';
import { GetStateData } from 'procon-ip/lib/get-state-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: Observable<GetStateData>;

  constructor(
    private getStateService: GetStateService,
  ) {}

  ngOnInit() {
    this.data = this.getStateService.getData();
  }
}
