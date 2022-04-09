import { Component, Input, Optional } from '@angular/core';
import { Relay } from './relay';
import { ListObjectComponent } from '../../object-list/list-object.directive';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.scss']
})
export class RelayComponent extends ListObjectComponent {
  @Input() listItem: Relay;
  @Input() @Optional() editMode: boolean;
}
