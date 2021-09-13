import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RelaysComponent} from './relays/relays.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'relays', component: RelaysComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'manifest.json',  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
