import { Component, Input, OnInit, Optional } from '@angular/core';
import { Electrode } from './electrode/electrode';
import { ElectrodeService } from './electrode.service';
import { ActionsService, IAction } from '../actions.service';

@Component({
  selector: 'app-electrodes',
  templateUrl: './electrodes.component.html',
  styleUrls: ['./electrodes.component.scss']
})
export class ElectrodesComponent implements OnInit {
  @Input() @Optional() editMode = false;
  @Input() @Optional() showHiddenItems = true;
  private readonly _editMode: IAction;
  private readonly _showHiddenItems: IAction;

  electrodes: Electrode[];

  constructor(
    private _actionsService: ActionsService,
    public electrodeService: ElectrodeService,
  ) {
    this._editMode = {
      caption: 'Edit',
      click: () => this.toggleEditMode(),
      icon: 'edit',
      active: false,
    };
    this._showHiddenItems = {
      caption: 'Show hidden relays',
      click: () => this.toggleShowHiddenItems(),
      icon: 'disabled_visible',
      active: true,
    };
    this.electrodes = electrodeService.getListObjects();
  }

  ngOnInit() {
    this._actionsService.add(this._showHiddenItems);
    this._actionsService.add(this._editMode);
  }

  toggleShowHiddenItems() {
    this._showHiddenItems.active = this.showHiddenItems = !this.showHiddenItems;
  }

  toggleEditMode() {
    this._editMode.active = this.editMode = !this.editMode;
  }
}
