import { TestBed } from '@angular/core/testing';

import { ActionsService, IAction } from './actions.service';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionsService', () => {
  let service: ActionsService;
  let actionsArray: IAction[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
    });
    service = TestBed.inject(ActionsService);
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
    expect(service.get().length).toEqual(0);
  });

  it('should be possible to set actions', () => {
    service.set(actionsArray);
    expect(service.get().asArray()).toEqual(actionsArray);
  });

  it('should be possible to add actions one by one', () => {
    actionsArray.forEach(action => service.add(action));
    expect(service.get().asArray()).toEqual(actionsArray);
  });

  it('should be possible to clear all actions', () => {
    service.set(actionsArray);
    expect(service.get().asArray()).toEqual(actionsArray);
    service.clear();
    expect(service.get().asArray()).toEqual([]);
  });

  it('should be possible to remove actions one by one', () => {
    actionsArray.forEach(action => service.add(action));
    expect(service.get().asArray()).toEqual(actionsArray)
    actionsArray.forEach(action => service.remove(action));
    expect(service.get().asArray()).toEqual([]);
  });

  it('should be possible to observe changes', () => {
    let triggerCount = 0;
    service.changes.subscribe((observedActions) => {
      triggerCount += 1;
      expect(service.get()).toEqual(observedActions);
    });
    actionsArray.forEach(action => service.add(action));
    expect(triggerCount).toEqual(actionsArray.length);
    actionsArray.forEach(action => service.remove(action));
    expect(triggerCount).toEqual(actionsArray.length * 2);
  });

  it('should be possible to register "onChanges" callbacks', () => {
    let triggerCount = 0;
    service.onChanges(serviceActions => {
      triggerCount += 1;
      expect(serviceActions).toEqual(service.get());
    });
    actionsArray.forEach(action => service.add(action));
    expect(triggerCount).toEqual(actionsArray.length);
    actionsArray.forEach(action => service.remove(action));
    expect(triggerCount).toEqual(actionsArray.length * 2);
  });

  it('should return actions with icons as "quick actions"', () => {
    service.set(actionsArray);
    const actions = service.get();
    actions.quickActionsLimit = 2;
    expect(service.get().asArray().filter(action => action.icon || action.iconSrc).slice(0, 2)).toEqual(actions.getQuickActions());
  });

  it('should return as "more actions" what is not returned as "quick actions"', () => {
    service.set(actionsArray);
    const actions = service.get();
    actions.quickActionsLimit = 2;
    const quickActions = actions.getQuickActions();
    expect(actions.getMoreActions()).toEqual(actionsArray.filter(action => quickActions.indexOf(action) < 0));
  });

  it('should return the first occurrence of an action matching the matcher', () => {
    service.set(actionsArray);
    expect(service.get().getFirst(action => action.id === '3')).toEqual(actionsArray[2]);
  });
});
