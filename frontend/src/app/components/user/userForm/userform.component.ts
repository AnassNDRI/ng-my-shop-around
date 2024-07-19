import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {Utilisateur} from "../../../models/utilisateur";
import {Role} from "../../../models/role";

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  user!: Utilisateur;
  editionMode = false;
  userId!: number;
  formGroup!: FormGroup;

  roleList: Role[]= [];

  isAdmin = false;
  accountMode = false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private formBuilder: FormBuilder,
               private roleService: RoleService,
               private datePipe: DatePipe,
               private authService: AuthenticationService,
               private userService: UserService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', Validators.email],
      mdp: ['', Validators.required],
      dateNaissance: [''],
      roleId: ['', Validators.required],
      telephone: [null],
      gsm: [null],
      actif: true
    });

    if( this.userId ) {
      this.editionMode = true;
      this.refreshUtilisateur();
    }

    this.roleService.list().subscribe( roles => {
      this.roleList = roles;
    })
  }
  refreshUtilisateur() {
    this.userService.findById(this.userId).subscribe( user => {
      this.user = user;
      let dateNaissanceOk = this.datePipe.transform(this.user.dateNaissance ,"yyyy-MM-dd");
      this.formGroup.patchValue({...this.user, dateNaissance: dateNaissanceOk} );
      console.log('utilisateur', user);
    } );
  }

  askSave() {
    this.user = this.formGroup.getRawValue();
    this.userService.save( this.user ).subscribe( utilisateur => {
      this.askBack();
    })

  }

  askBack() {
    if( this.accountMode ) {
      this.router.navigate(['/utilisateurs/single'])
    } else {
      this.router.navigate(['/utilisateurs'])
    }
  }
}
