import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
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

  constructor() { }

  ngOnInit(): void {
  }

}
