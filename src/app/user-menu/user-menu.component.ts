import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  public isAuthenticated: boolean;
  public userName: string;

  constructor() { }

  ngOnInit() {
    this.isAuthenticated = true;
    this.userName = 'admin';
  }
}
