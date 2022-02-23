import { Injectable } from '@angular/core';
import { GetStateService as InternalService, IGetStateServiceConfig } from 'procon-ip/lib/get-state.service';
import { SettingsService } from './settings/settings.service';
import { GetStateCategory, GetStateData } from 'procon-ip/lib/get-state-data';
import { Logger } from 'procon-ip/lib/logger';
import { Observable, of } from 'rxjs';
import { RelayDataObject } from 'procon-ip/lib/relay-data-object';
import { GetStateDataObject } from 'procon-ip/lib/get-state-data-object';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class GetStateService {
  private readonly _logger: Logger;
  private _service: InternalService;
  private _data: GetStateData;
  private _callbacks: ((data: GetStateData) => void)[];

  constructor(
    private settingsService: SettingsService,
    private log: LogService,
  ) {
    this._logger = log.getLogger();
    this._callbacks = [
      data => { this._data = data; },
    ];
    settingsService.watchApiServiceConfig().subscribe(config => {
      if (config !== undefined) {
        this.deinit();
        // if (!config.requestHeaders)
        //   config.requestHeaders = {};
        // config.requestHeaders['Sec-Fetch-Site'] = 'cross-site';
        this.init(config);
      }
    });
  }

  private init(config: IGetStateServiceConfig) {
    this._service = new InternalService(config, this._logger);
    this._service.start((data) => {
      this.processData(data);
    });
  }

  private deinit() {
    if (this._service !== undefined) {
      if (this._service.isRunning())
        this._service.stop();
      delete this._service;
    }
  }

  private processData(data: GetStateData) {
    this._callbacks.forEach(callback => {
      callback(data);
    });
  }

  registerCallback(callable: (data: GetStateData) => void): number {
    this._callbacks.push(callable);
    return this._callbacks.indexOf(callable);
  }

  removeCallback(callable: number | ((data: GetStateData) => void)) {
    let index: number;
    if (typeof callable === 'number') {
      index = callable;
    } else {
      index = this._callbacks.indexOf(callable);
    }

    this._callbacks.splice(index, 1);
  }

  getData(): Observable<GetStateData> {
    return of(this._data);
  }

  private isRelay(object: GetStateDataObject) {
    return object.category === GetStateCategory.RELAYS || object.category === GetStateCategory.EXTERNAL_RELAYS;
  }

  getRelayDataObjects(data?: GetStateData): RelayDataObject[] {
    const relays = [];

    if (data) {
      data.objects.filter(obj => this.isRelay(obj)).forEach(obj => { relays.push(new RelayDataObject(obj)); });
    } else {
      this._data.objects.filter(obj => this.isRelay(obj)).forEach(obj => { relays.push(new RelayDataObject(obj)); });
    }

    return relays;
  }

  getInternalService(): InternalService {
    return this._service;
  }
}
