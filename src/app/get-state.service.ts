import { Injectable } from '@angular/core';
import { SettingsService } from './settings/settings.service';
import { Observable, of } from 'rxjs';
import { LogService } from './log.service';
import {
  GetStateCategory,
  GetStateData,
  GetStateDataObject,
  GetStateService as InternalService,
  IGetStateServiceConfig,
  Logger,
  RelayDataObject,
} from 'procon-ip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetStateService {
  private readonly _logger: Logger;
  private _service: InternalService;
  private _data: GetStateData;
  private _callbacks: ((data: GetStateData) => void)[];

  constructor(
    private _log: LogService,
    private _router: Router,
    private _settings: SettingsService,
    private _snackBar: MatSnackBar,
  ) {
    this._logger = _log.getLogger();
    this._callbacks = [
      data => { this._data = data; },
    ];
    _settings.onApiServiceConfigChange(config => {
      if (config !== undefined) {
        this.deinit();
        this.init(config);
      }
    });
  }

  private init(config: IGetStateServiceConfig) {
    this._service = new InternalService(config, this._logger);
    this._service.start(
      data => this.processData(data),
      error => this.connectionError(error),
      true,
    );
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

  private connectionError(error: any) {
    if (error.isAxiosError && error.response && error.response.status) {
      const snack = this._snackBar.open(
        `Connection Error: ${error.message}`,
        'Open Settings'
      );
      snack.onAction().subscribe(() => {
        this._router.navigate(['/settings']).finally(() => {
          this.connectionError(error);
        });
      });
    } else {
      this._snackBar.open(`Lost Connection: ${error.message}`, 'Dismiss');
    }
  }
}
