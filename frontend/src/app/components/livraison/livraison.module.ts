import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivraisonListComponent } from './livraison-list/livraison-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LivraisonRoutingModule} from './livraison-routing.module';



@NgModule({
  declarations: [
    LivraisonListComponent,
  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LivraisonModule { }
