import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduitListComponent} from "./produitsList/produit-list.component";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProduitListComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ ProduitListComponent ]
})
export class ProduitSharedModule { }
