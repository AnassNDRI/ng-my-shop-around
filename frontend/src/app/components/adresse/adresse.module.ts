import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdresseFormComponent } from './adresse-form/adresse-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdresseRoutingModule} from "./adresse-routing.module";
import { AdresseListComponent } from './adresse-list/adresse-list.component';




@NgModule({
  declarations: [
    AdresseFormComponent,
    AdresseListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdresseRoutingModule,

  ],

  exports: [

  ]
})
export class AdresseModule { }
