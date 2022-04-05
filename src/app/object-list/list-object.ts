import { GetStateCategory, GetStateDataObject } from 'procon-ip';
import { Type } from '@angular/core';

export interface IListObject {
  dataObject: GetStateDataObject;
  isHidden: boolean;
}

export interface IListItem extends IListObject {
  component: Type<any>;
  init(...args: any[]);
  clone(): IListItem;
  getLabel(): string;
  getLongId(): string;
  show();
  hide();
  update(dataObject: GetStateDataObject): boolean;
  asObject(): IListObject;
}

export abstract class AbstractListObject implements IListItem {
  protected abstract _component: Type<any>;
  protected _dataObject: GetStateDataObject;
  protected _hidden: boolean;

  abstract init(...args: any[]);
  abstract clone(): AbstractListObject;

  get component(): Type<any> {
    return this._component;
  }

  get dataObject(): GetStateDataObject {
    return this._dataObject;
  }

  get isHidden(): boolean {
    return this._hidden;
  }

  getLabel(): string {
    return this._dataObject.label;
  }

  getLongId(): string {
    return this.getCategoryTitle() + ' No. ' + this._dataObject.categoryId;
  }

  getCategoryTitle(): string {
    switch (this._dataObject.category) {
      case GetStateCategory.CANISTER:
        return "Canister";
      case GetStateCategory.ANALOG:
        return "Analog Device";
      case GetStateCategory.CANISTER:
        return "Canister";
      case GetStateCategory.DIGITAL_INPUT:
        return "Digital Input";
      case GetStateCategory.ELECTRODES:
        return "Electrode";
      case GetStateCategory.EXTERNAL_RELAYS:
        return "Ext. Relay";
      case GetStateCategory.RELAYS:
        return "Relay";
      case GetStateCategory.TEMPERATURES:
        return "Temperature";
    }
  }

  show() {
    this._hidden = false;
  }

  hide() {
    this._hidden = true;
  }

  update(dataObject: GetStateDataObject): boolean {
    let isUpdate = false;

    dataObject.forFields(field => {
      if (dataObject[field] !== this._dataObject[field]) {
        if (field === 'label' && this._dataObject[field] === 'n.a.') {
          this._hidden = false;
        } else if (field === 'label' && dataObject[field] === 'n.a.') {
          this._hidden = true;
        }
        this._dataObject[field] = dataObject[field];

        isUpdate = true;
      }
    });

    return isUpdate;
  }

  asObject(): IListObject {
    return {
      dataObject: this._dataObject,
      isHidden: this._hidden,
    };
  }

  protected initFromObject(listObject: IListObject) {
    if (listObject) {
      this._dataObject = this.createGetStateDataObject(listObject.dataObject);
      this._hidden = listObject.isHidden ?? false;
    } else {
      throw new Error("Missing [dataObject]");
    }
  }

  createGetStateDataObject(deserialized: object): GetStateDataObject {
    const deserializedListObject = deserialized as GetStateDataObject;
    if (
      deserializedListObject !== undefined &&
      deserializedListObject.id !== undefined &&
      deserializedListObject.label !== undefined &&
      deserializedListObject.unit !== undefined &&
      deserializedListObject.offset !== undefined &&
      deserializedListObject.gain !== undefined &&
      deserializedListObject.raw !== undefined
    ) {
      return new GetStateDataObject(
        deserializedListObject.id,
        deserializedListObject.label,
        deserializedListObject.unit,
        deserializedListObject.offset.toString(),
        deserializedListObject.gain.toString(),
        deserializedListObject.raw.toString());
    } else {
      throw new Error("Invalid [dataObject]");
    }
  }
}


export class ListObject extends AbstractListObject {
  protected _component;

  init(...args: any[]);
  init(component: Type<any>, listObject: ListObject, hidden?: boolean);
  init(component: Type<any>, listObject: IListObject|object, hidden?: boolean);
  init(component: Type<any>, dataObject: GetStateDataObject, hidden?: boolean);
  init(...args: any[]) {
    if (args.length < 2)
      throw new Error(`Too few arguments. Expected 2 or more, got ${args.length}`);
    let component = args[0];
    let obj = args[1];
    let hidden = null;
    if (args.length > 2)
      hidden = args[2]

    this._component = component;
    if (obj instanceof ListObject) {
      this._dataObject = obj.dataObject;
      this._hidden = hidden ?? obj.isHidden ?? false;
    } else if (obj instanceof GetStateDataObject) {
      this._dataObject = obj;
      this._hidden = hidden ?? false;
    } else {
      const listObject = obj as IListObject;
      this.initFromObject(listObject);
    }
  }

  clone(): ListObject {
    const newOne = new ListObject();
    newOne.init(this._component, this._dataObject, this._hidden);
    return newOne;
  }
}
