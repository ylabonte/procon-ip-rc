import { ListObject } from '../../object-list/list-object';
import { SensorComponent } from './sensor.component';

export class Sensor extends ListObject {
  protected _component = SensorComponent;
}
