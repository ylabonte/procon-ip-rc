import { Component, Input, OnInit } from '@angular/core';
import { Relay } from './relay';
import { ListObjectComponent } from '../../object-list/list-object.directive';
import { ToolbarService, IAction } from '../../toolbar.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.scss']
})
export class RelayComponent extends ListObjectComponent implements OnInit {
  @Input() listItem: Relay;
  editModeAction: IAction;

  constructor(private _actionsService: ToolbarService) {
    super();
  }

  ngOnInit() {
    of(this._actionsService.getActions().getFirst(action => action.id === 'editMode')).subscribe(action => {
      this.editModeAction = action;
    });
  }
}
