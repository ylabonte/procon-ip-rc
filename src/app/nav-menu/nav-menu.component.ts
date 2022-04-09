import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  navigationItems = [{
    displayName: 'Dashboard',
    link: '/dashboard',
    icon: 'dashboard',
  }, {
    displayName: 'Relays',
    link: '/relays',
    icon: 'toggle_on',
  }, {
    displayName: 'Temperatures',
    link: '/temperatures',
    icon: 'thermostat',
  }, {
    displayName: 'Canisters',
    link: '/canisters',
    icon: 'format_color_fill',
  }, {
    displayName: 'Settings',
    link: '/settings',
    icon: 'settings',
  }, {
    displayName: 'About',
    link: '/about',
    icon: 'help_outline'
  }];

  @Input() closeOnClick: boolean;
  @Input() sidenav: MatSidenav;

  click() {
    if (this.closeOnClick)
      this.sidenav.close();
  }
}
