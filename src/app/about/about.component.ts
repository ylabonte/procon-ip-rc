import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private _toolbar: ToolbarService) { }

  ngOnInit() {
    this._toolbar.setTitle('About');
  }
}
