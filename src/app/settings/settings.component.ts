import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MediaMatcher} from "@angular/cdk/layout";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SettingsService} from "./settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('iconToggle', [
      state('active', style({})),
      state('inactive', style({
        opacity: 0.2,
      })),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
  ],
})
export class SettingsComponent implements OnInit {

  controllerUrl = new FormControl('');
  username = new FormControl('admin');
  password = new FormControl('admin');
  hidePassword = true;
  useBasicAuth = new FormControl(true)
  updateInterval = new FormControl('3');
  requestTimeout = new FormControl('2');
  requestErrorTolerance = new FormControl('2')
  darkMode = new FormControl(true);

  constructor(
    private mediaMatcher: MediaMatcher,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.darkMode.setValue(this.settingsService.darkMode);
    this.darkMode.valueChanges.subscribe(v => {
      this.settingsService.darkMode = v;
    });
  }
}
