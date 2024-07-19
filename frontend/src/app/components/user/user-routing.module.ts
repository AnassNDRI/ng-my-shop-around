import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./userList/user-list.component";
import {UserformComponent} from "./userForm/userform.component";
import {UserSelectedComponent} from "./userSelected/user-selected.component";
import {AdministratorGuard} from "../../helpers/administrator.guard";


const routes: Routes = [
  {
    path: '', children: [
      { path: 'list', component: UserListComponent, canActivate: [AdministratorGuard] },
      { path: 'form', component: UserformComponent, canActivate: [AdministratorGuard] },
      { path: 'form/:id', component: UserformComponent, canActivate: [AdministratorGuard] },
      { path: 'single', component: UserSelectedComponent },
      { path: 'single/form', component: UserformComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
