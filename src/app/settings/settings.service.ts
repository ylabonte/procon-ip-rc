import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IGetStateServiceConfig } from 'procon-ip';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _apiServicesConfig: IGetStateServiceConfig = {
    controllerUrl: null,
    username: '',
    password: '',
    basicAuth: false,
    updateInterval: 3000,
    timeout: 3000,
    errorTolerance: 3,
  };

  private _darkMode: boolean;
  private _darkModeMediaQuery: MediaQueryList;

  constructor(
    private _mediaMatcher: MediaMatcher,
    private _storage: StorageMap,
  ) {
    this._apiServicesConfig.controllerUrl = `${location.protocol}//${location.host}/assets`;
    const self = this;
    this._darkModeMediaQuery = this._mediaMatcher.matchMedia('all and (prefers-color-scheme: dark)');
    this._darkMode = this._darkModeMediaQuery.matches;

    this._storage.get('darkMode').subscribe(darkMode => {
      if (darkMode === undefined) this.setDarkModeBySystemPreference();
      else this.setDarkMode(darkMode as boolean);
    });

    this._darkModeMediaQuery.addEventListener('change', ev => {
      if (confirm('Your system color scheme has changed. Shall we adapt?')) {
        self.setDarkModeBySystemPreference();
      }
    });
  }

  private setDarkModeBySystemPreference() {
    this._storage.set('darkMode', this._darkModeMediaQuery.matches).subscribe(() => {});
  }

  setDarkMode(on: boolean) {
    this._storage.set('darkMode', on).subscribe(() => {});
  }

  getDarkMode(): Observable<boolean> {
    return this._storage.get('darkMode') as Observable<boolean>;
  }

  watchDarkMode(): Observable<boolean> {
    return this._storage.watch('darkMode') as Observable<boolean>;
  }

  getCachedDarkMode(): boolean {
    return this._darkMode;
  }

  private saveApiServiceConfig() {
    this._storage.set('apiServiceConfig', this._apiServicesConfig).subscribe(() => {});
  }

  getApiServiceConfig(): Observable<IGetStateServiceConfig> {
    return this._storage.get('apiServiceConfig') as Observable<IGetStateServiceConfig>;
  }

  watchApiServiceConfig(): Observable<IGetStateServiceConfig> {
    return this._storage.watch('apiServiceConfig') as Observable<IGetStateServiceConfig>;
  }

  setControllerUrl(controllerUrl: URL) {
    this._apiServicesConfig.controllerUrl = controllerUrl.toString();
    this.saveApiServiceConfig();
  }

  setUsername(username: string) {
    this._apiServicesConfig.username = username;
    this.saveApiServiceConfig();
  }

  setPassword(password: string) {
    this._apiServicesConfig.password = password;
    this.saveApiServiceConfig();
  }

  setBasicAuth(useAuthentication: boolean) {
    this._apiServicesConfig.basicAuth = useAuthentication;
    this.saveApiServiceConfig();
  }

  setUpdateInterval(interval: number) {
    this._apiServicesConfig.updateInterval = interval;
    this.saveApiServiceConfig();
  }

  setTimeout(timeout: number) {
    this._apiServicesConfig.timeout = timeout;
    this.saveApiServiceConfig();
  }

  setErrorTolerance(maxErrors: number) {
    this._apiServicesConfig.errorTolerance = maxErrors;
    this.saveApiServiceConfig();
  }
}
