import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface IAction {
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
export class ActionsService {
  private readonly _actions: Actions;
  private readonly _changes: EventEmitter<Actions>;
  private readonly _changesCallbacks: (($event: Actions) => any)[];

  constructor(
    private _router: Router
  ) {
    this._actions = new Actions();
    this._changes = new EventEmitter<Actions>();
    this._changesCallbacks = [];
    this._router.events.subscribe(() => {
      this.clear();
    });
  }

  private emitChanges() {
    this._changes.emit(this._actions);
    this._changesCallbacks.forEach(c => c(this._actions));
  }

  get changes(): Observable<Actions> {
    return this._changes;
  }

  onChanges(callback: ($event: Actions) => any) {
    this._changesCallbacks.push(callback);
  }

  get(): Actions {
    return this._actions;
  }

  set(actions: IAction[]) {
    this._actions.splice(0);
    actions.forEach(action => this._actions.push(action));
    this.emitChanges();
  }

  clear() {
    this._actions.splice(0);
    this.emitChanges();
  }

  add(action: IAction) {
    this._actions.push(action);
    this.emitChanges();
  }

  remove(action: IAction) {
    const index = this._actions.indexOf(action)
    if (index > -1) {
      this._actions.splice(index, 1);
      this.emitChanges();
    }
  }
}
