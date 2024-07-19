import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../models/utilisateur";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, CanActivate, Router} from "@angular/router";
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  currentUser!: Utilisateur;

  constructor( private authService: AuthenticationService,
               private router:Router ,
               private profileService: ProfileService) {
  }


  ngOnInit(): void {

    this.profileService.getAccount().subscribe( utilisateur => this.currentUser = utilisateur );
    console.log('this.currentUser', this.currentUser);

  }


  Fermer() {
    this.router.navigate(['/home']);
  }
}
