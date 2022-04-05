import { Component, Input, OnInit } from '@angular/core';
import { ListObjectComponent } from '../../object-list/list-object.directive';
import { GetStateDataObject } from 'procon-ip';
import { Canister } from './canister';

@Component({
  selector: 'app-canister',
  templateUrl: './canister.component.html',
  styleUrls: ['./canister.component.scss']
})
export class CanisterComponent extends ListObjectComponent implements OnInit {
  @Input() listItem: Canister;
  filling: GetStateDataObject;
  consumption: GetStateDataObject;

  ngOnInit(): void {
    this.filling = this.listItem.filling;
    this.consumption = this.listItem.consumption;
  }
}
