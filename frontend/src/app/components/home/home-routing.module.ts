import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {PanierComponent} from '../panier/panier/panier.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '/panier', component: PanierComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
