import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserListComponent} from "./userList/user-list.component";
import {UserformComponent} from "./userForm/userform.component";
import {UserSelectedComponent} from "./userSelected/user-selected.component";
import {UserRoutingModule} from "./user-routing.module";



@NgModule({
  declarations: [
    UserListComponent,
    UserformComponent,
    UserSelectedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
