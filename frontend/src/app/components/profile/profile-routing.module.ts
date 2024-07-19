import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from "./profile-page/profile-page.component";


const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: ProfilePageComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

