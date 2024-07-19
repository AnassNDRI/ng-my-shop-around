import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {ProfileRoutingModule} from "./profile-routing.module";



@NgModule({
  declarations: [
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class profileModule { }
