import { RelayDataObject } from 'procon-ip/lib/relay-data-object';
import { GetStateCategory } from 'procon-ip/lib/get-state-data';
import { RelayDataInterpreter } from 'procon-ip/lib/relay-data-interpreter';

export interface IRelay {
  _interpreter: RelayDataInterpreter;
  _dataObject: RelayDataObject;
  _hidden: boolean;
  _disabledManualOff: boolean;
}

export class Relay {
  private _interpreter: RelayDataInterpreter;
  private _dataObject: RelayDataObject;
  private _hidden: boolean;
  private _disabledManualOff: boolean;
  private _switched = false;

  constructor(
    interpreter: RelayDataInterpreter,
    relayDataObject: RelayDataObject,
    hidden?: boolean,
    disabledManualOff?: boolean,
  ) {
    this._interpreter = interpreter;
    this._dataObject = relayDataObject;
    this._hidden = hidden ?? this._dataObject.label === 'n.a.';
    this._disabledManualOff = disabledManualOff ?? false;
  }

  update(relayDataObject: RelayDataObject): boolean {
    let isUpdate = false;

    relayDataObject.forFields(field => {
      if (relayDataObject[field] !== this._dataObject[field]) {
        if (field === 'label' && this._dataObject[field] === 'n.a.') {
          this._hidden = false;
        } else if (field === 'label' && relayDataObject[field] === 'n.a.') {
          this._hidden = true;
        }
        this._dataObject[field] = relayDataObject[field];

        isUpdate = true;
      }
    });

    return isUpdate;
  }

  isOn(): boolean {
    return this._interpreter.isOn(this._dataObject);
  }

  isOff(): boolean {
    return this._interpreter.isOff(this._dataObject);
  }

  isAuto(): boolean {
    return this._interpreter.isAuto(this._dataObject);
  }

  getLabel(): string {
    return this._dataObject.label;
  }

  getStatusLabel(): string {
    return (this.isAuto() ? 'automatically' : 'manually') +
      ' switched ' + (this.isOn() ? 'on' : 'off');
  }

  getLongId(): string {
    return (this._dataObject.category === GetStateCategory.EXTERNAL_RELAYS ?
      'Ext. Relay No. ' :
      'Relay No. '
    ) + this._dataObject.categoryId;
  }

  getObjectId(): number {
    return this._dataObject.id;
  }

  getDataObject(): RelayDataObject {
    return this._dataObject;
  }

  isHidden(): boolean {
    return this._hidden;
  }

  hide() {
    this._hidden = true;
  }

  show() {
    this._hidden = false;
  }

  setSwitched() {
    this._switched = true;
  }

  setUpdated() {
    this._switched = false;
  }

  isSwitched(): boolean {
    return this._switched;
  }
}