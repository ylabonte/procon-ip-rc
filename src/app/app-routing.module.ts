import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RelaysComponent } from './relays/relays.component';
import { SettingsComponent } from './settings/settings.component';
import { TemperaturesComponent } from './temperatures/temperatures.component';
import { CanistersComponent } from './canisters/canisters.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'relays', component: RelaysComponent },
  { path: 'temperatures', component: TemperaturesComponent },
  { path: 'canisters', component: CanistersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
