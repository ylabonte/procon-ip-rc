import { Component, Input, OnInit } from '@angular/core';
import { Relay } from './relay';
import { ListObjectComponent } from '../../object-list/list-object.directive';
import { ActionsService, IAction } from '../../actions.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.scss']
})
export class RelayComponent extends ListObjectComponent implements OnInit {
  @Input() listItem: Relay;
  editModeAction: IAction;

  constructor(private _actionsService: ActionsService) {
    super();
  }

  ngOnInit() {
    of(this._actionsService.get().getFirst(action => action.id === 'editMode')).subscribe(action => {
      this.editModeAction = action;
    });
  }
}
