import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../models/utilisateur";
import {Role} from "../../../models/role";
import { Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import {UserService} from "../../../services/user.service";
import {AdresseTypeService} from "../../../services/adresse-type.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Utilisateur[] = [];
  roleList: Role[]= [];
  user!: Utilisateur;
  isAdmin = false;
  accountMode = false;

  constructor(
              private roleService: RoleService,
              private addresseService: AdresseTypeService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.roleService.list().subscribe(result => this.roleList = result);
    this.refresh();
  }

  refresh() {
    this.userService.list().subscribe(users => {
      this.users = users;
    });
  }

  askEdit(id: number) {
    this.router.navigate(['/utilisateurs', 'form', id]);
  }

  askDelete(id: number) {
    this.userService.delete(id).subscribe(() => {
      alert('cet utilisateur  bien été supprimé');
      this.refresh();
    });
  }

  askAdd() {
    this.router.navigate(['/utilisateurs', 'form']);
  }

  askBack() {
    this.router.navigate(['/admin']);
  }

  getLabelRole(roleId: number) {
    const role = this.roleList.find(role => role.id === roleId);
    if (role) {
      return role.libelle;
    }
    return 'Pas d\'utilisateur';
  }

}
