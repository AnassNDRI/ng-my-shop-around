import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdresseFormComponent} from "./adresse-form/adresse-form.component";
import {AdresseListComponent} from "./adresse-list/adresse-list.component";




const routes: Routes = [
  {
    path: '',children: [
  { path: 'form', component: AdresseFormComponent },
  { path: 'form/:id', component: AdresseFormComponent },
  { path: 'list', component: AdresseListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdresseRoutingModule { }
