import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../models/utilisateur";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-selected',
  templateUrl: './user-selected.component.html',
  styleUrls: ['./user-selected.component.css']
})
export class UserSelectedComponent implements OnInit {

  user!: Utilisateur
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.findAccount().subscribe( res => this.user = res);
  }

  askBack() {
    this.router.navigate(['/profile']);
  }

  askEdit(id: number) {
    this.router.navigate(['/utilisateurs', 'single', 'form']);
  }
}
