import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IGetStateServiceConfig } from 'procon-ip/lib/get-state.service';
import {MediaMatcher} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiServicesConfig: IGetStateServiceConfig;

  public darkMode: boolean;
  private darkModeMediaQuery: MediaQueryList;

  constructor(
    private mediaMatcher: MediaMatcher,
    private storage: StorageMap,
  ) {
    const self = this;
    this.darkModeMediaQuery = this.mediaMatcher.matchMedia('all and (prefers-color-scheme: dark)');
    this.darkModeMediaQuery.addEventListener('change', ev => {
      self.updateDarkMode();
    });
    this.updateDarkMode();
  }

  updateDarkMode() {
    this.darkMode = this.darkModeMediaQuery.matches;
  }
}
