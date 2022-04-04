import { Component, Input } from '@angular/core';
import { GetStateDataObject } from 'procon-ip';
import { Relay } from './relay';
import { IListObjectComponent, ListObjectComponent } from '../../object-list/list-object.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.scss']
})
export class RelayComponent extends ListObjectComponent {
  @Input() listItem: Relay;
}
