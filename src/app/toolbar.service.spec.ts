import { TestBed } from '@angular/core/testing';

import { ToolbarService, IAction } from './toolbar.service';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionsService', () => {
  let service: ToolbarService;
  let actionsArray: IAction[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
    });
    service = TestBed.inject(ToolbarService);
    actionsArray = [
      {
        caption: 'action1',
        icon: '',
        click: () => {},
      },
      {
        caption: 'action2',
        click: () => {},
      },
      {
        id: '3',
        caption: 'action3',
        iconSrc: '',
        click: () => {},
      },
      {
        caption: 'action4',
        click: () => {},
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should return empty array after initialization', () => {
    expect(service.getActions().length).toEqual(0);
  });

  it('should be possible to set actions', () => {
    service.setActions(actionsArray);
    expect(service.getActions().asArray()).toEqual(actionsArray);
  });

  it('should be possible to add actions one by one', () => {
    actionsArray.forEach(action => service.addAction(action));
    expect(service.getActions().asArray()).toEqual(actionsArray);
  });

  it('should be possible to clear all actions', () => {
    service.setActions(actionsArray);
    expect(service.getActions().asArray()).toEqual(actionsArray);
    service.clearActions();
    expect(service.getActions().asArray()).toEqual([]);
  });

  it('should be possible to remove actions one by one', () => {
    actionsArray.forEach(action => service.addAction(action));
    expect(service.getActions().asArray()).toEqual(actionsArray)
    actionsArray.forEach(action => service.removeAction(action));
    expect(service.getActions().asArray()).toEqual([]);
  });

  it('should be possible to observe changes', () => {
    let triggerCount = 0;
    service.actionsChange.subscribe((observedActions) => {
      triggerCount += 1;
      expect(service.getActions()).toEqual(observedActions);
    });
    actionsArray.forEach(action => service.addAction(action));
    expect(triggerCount).toEqual(actionsArray.length);
    actionsArray.forEach(action => service.removeAction(action));
    expect(triggerCount).toEqual(actionsArray.length * 2);
  });

  it('should be possible to register "onChanges" callbacks', () => {
    let triggerCount = 0;
    service.onActionsChange(serviceActions => {
      triggerCount += 1;
      expect(serviceActions).toEqual(service.getActions());
    });
    actionsArray.forEach(action => service.addAction(action));
    expect(triggerCount).toEqual(actionsArray.length);
    actionsArray.forEach(action => service.removeAction(action));
    expect(triggerCount).toEqual(actionsArray.length * 2);
  });

  it('should return actions with icons as "quick actions"', () => {
    service.setActions(actionsArray);
    const actions = service.getActions();
    actions.quickActionsLimit = 2;
    expect(service.getActions().asArray().filter(action => action.icon || action.iconSrc).slice(0, 2)).toEqual(actions.getQuickActions());
  });

  it('should return as "more actions" what is not returned as "quick actions"', () => {
    service.setActions(actionsArray);
    const actions = service.getActions();
    actions.quickActionsLimit = 2;
    const quickActions = actions.getQuickActions();
    expect(actions.getMoreActions()).toEqual(actionsArray.filter(action => quickActions.indexOf(action) < 0));
  });

  it('should return the first occurrence of an action matching the matcher', () => {
    service.setActions(actionsArray);
    expect(service.getActions().getFirst(action => action.id === '3')).toEqual(actionsArray[2]);
  });
});
