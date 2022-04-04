import { GetStateCategory, GetStateDataObject, RelayDataInterpreter, RelayDataObject } from 'procon-ip';
import { AbstractListObject, IListItem, IListObject } from '../../object-list/list-object';
import { RelayComponent } from './relay.component';

export interface IRelayObject extends IListObject {
  dataObject: RelayDataObject;
  disabledManualOff: boolean;
}

export class Relay extends AbstractListObject implements IListItem, IRelayObject {
  protected readonly _component = RelayComponent;

  protected _dataObject: RelayDataObject;

  private _interpreter: RelayDataInterpreter;
  private _disabledManualOff: boolean;
  private _switched = false;

  init(interpreter: RelayDataInterpreter, relay: Relay, hidden?: boolean, disabledManualOff?: boolean);
  init(interpreter: RelayDataInterpreter, relayObject: IRelayObject|object, hidden?: boolean, disabledManualOff?: boolean);
  init(interpreter: RelayDataInterpreter, relayDataObject: RelayDataObject, hidden?: boolean, disabledManualOff?: boolean);
  init(
    interpreter: RelayDataInterpreter,
    relayData: Relay|IRelayObject|object|RelayDataObject,
    hidden?: boolean,
    disabledManualOff?: boolean,
  ) {
    this._interpreter = interpreter;
    if (relayData instanceof Relay) {
      this._dataObject = relayData.dataObject;
      this._disabledManualOff = relayData.disabledManualOff;
      this._hidden = relayData.isHidden;
    } else if (relayData instanceof GetStateDataObject) {
      this._dataObject = relayData;
    } else {
      this.initFromObject(relayData);
    }
    this._disabledManualOff = disabledManualOff ?? this._disabledManualOff ?? false;
    this._hidden = hidden ?? this._hidden ?? false;
  }

  clone() {
    const relay = new Relay();
    relay.init(this._interpreter, this._dataObject, this._hidden, this._disabledManualOff);
    return relay;
  }

  asObject(): IRelayObject {
    return {
      dataObject: this._dataObject,
      disabledManualOff: this._disabledManualOff,
      isHidden: this._hidden,
    };
  }

  protected initFromObject(relayObject: object) {
    const relay = relayObject as IRelayObject;
    if (relay) {
      this._dataObject = new RelayDataObject(this.createGetStateDataObject(relay.dataObject));
      this._hidden = relay.isHidden ?? false;
      this._disabledManualOff = relay.disabledManualOff;
    } else {
      throw new Error("Missing [dataObject]");
    }
  }

  get dataObject(): RelayDataObject {
    return this._dataObject;
  }

  get interpreter(): RelayDataInterpreter {
    return this._interpreter;
  }

  get disabledManualOff(): boolean {
    return this._disabledManualOff;
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
