import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface IAction {
  id?: string;
  active?: boolean;
  caption: string;
  click: ($event: Event) => any;
  icon?: string;
  iconSrc?: string;
}

export class Actions extends Array<IAction> {
  quickActionsLimit = 2;

  asArray(): IAction[] {
    const actionsArray: IAction[] = [];
    this.forEach(action => actionsArray.push(action));
    return actionsArray;
  }

  getFirst(matcher?: (action: IAction) => boolean): IAction {
    for (let i = 0; i < this.length; i++)
      if (matcher(this[i]))
        return this[i];
    return null;
  }

  getQuickActions(): IAction[] {
    return this.asArray().filter(action => action.icon || action.iconSrc).slice(0, this.quickActionsLimit);
  }

  getMoreActions(): IAction[] {
    const quickActions = this.getQuickActions();
    return this.asArray().filter(action => quickActions.indexOf(action) < 0);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private readonly _actions: Actions;
  private readonly _actionsChange: EventEmitter<Actions>;
  private readonly _actionsChangeCallbacks: (($event: Actions) => any)[];
  private readonly _titleChange: EventEmitter<string>;
  private _title: {
    default: string,
    custom?: string,
  };

  constructor(
    private _router: Router,
  ) {
    this._actions = new Actions();
    this._actionsChange = new EventEmitter<Actions>();
    this._actionsChangeCallbacks = [];
    this._titleChange = new EventEmitter<string>();
    this._title = { default: 'ProCon.IP RC' };
    this._router.events.subscribe(() => {
      this.clearActions();
      this.setTitle();
    });
  }

  private emitChanges() {
    this._actionsChange.emit(this._actions);
    this._actionsChangeCallbacks.forEach(c => c(this._actions));
  }

  get actionsChange(): Observable<Actions> {
    return this._actionsChange;
  }

  get titleChange(): Observable<string> {
    return this._titleChange;
  }

  onActionsChange(callback: ($event: Actions) => any) {
    this._actionsChangeCallbacks.push(callback);
  }

  getActions(): Actions {
    return this._actions;
  }

  setActions(actions: IAction[]) {
    this._actions.splice(0);
    actions.forEach(action => this._actions.push(action));
    this.emitChanges();
  }

  clearActions() {
    this._actions.splice(0);
    this.emitChanges();
  }

  addAction(action: IAction) {
    this._actions.push(action);
    this.emitChanges();
  }

  removeAction(action: IAction) {
    const index = this._actions.indexOf(action)
    if (index > -1) {
      this._actions.splice(index, 1);
      this.emitChanges();
    }
  }

  setTitle(title?: string) {
    this._title.custom = title;
    this._titleChange.emit(this.getTitle());
  }

  getTitle(): string {
    return this._title.custom ?? this._title.default;
  }
}
