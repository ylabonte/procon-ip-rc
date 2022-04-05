import { GetStateDataObject } from 'procon-ip';
import { IListItem, ListObject } from '../../object-list/list-object';

export class Canister extends ListObject implements IListItem {
  private _consumptionData: GetStateDataObject;

  init(...args: any[]
    // component: Type<any>,
    // canisterData: GetStateDataObject,
    // hidden: boolean,
    // consumptionData: GetStateDataObject,
  ) {
    if (args.length < 2)
      throw new Error(`Too few arguments. Expected 2, got ${args.length}`);
    super.init(args[0], args[1], args.length > 2 ? args[2] : null);
    this._consumptionData = args.length > 3 ? args[3] : null;
  }

  get filling(): GetStateDataObject {
    return this._dataObject;
  }

  get consumption(): GetStateDataObject {
    return this._consumptionData;
  }

  update(dataObject: GetStateDataObject, consumptionDataObject?: GetStateDataObject): boolean {
    let isUpdate = super.update(dataObject);
    if (consumptionDataObject) {
      consumptionDataObject.forFields(field => {
        if (consumptionDataObject[field] !== this._consumptionData[field]) {
          this._consumptionData[field] = consumptionDataObject[field];
          isUpdate = true;
        }
      });
    }

    return isUpdate;
  }
}
