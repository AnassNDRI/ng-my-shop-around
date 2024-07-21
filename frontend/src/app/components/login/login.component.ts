import {Component, OnDestroy, OnInit} from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LayoutService} from "../../services/layout.service";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  credentials!: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private layoutService: LayoutService,
    private router: Router
  ) { }




  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      utilisateur_email: ['', [Validators.required, Validators.email]],
      utilisateur_mdp: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.layoutService.headerVisible.next(false);

  }

  ngOnDestroy() {
    this.layoutService.headerVisible.next(true);
  }

  login(){
    if (this.credentials.valid){
      this.authService.login(this.credentials.value).subscribe(
        {
          next: (res) => {
            if(res){
              this.authService.isAuthenticated.next(true);
              this.router.navigate(['/home']);
            }else {
              this.authService.isAuthenticated.next(false);
              console.log(res.message);
              this.router.navigate(['/login']);
            }
          },
          error: (error) => {
            if (error.error && error.error.error && error.error.error.message) {
              this.error = error.error.error.message;
            } else if (error.message) {
              this.error = error.message;
            } else {
              this.error = 'Une erreur est survenue. Veuillez réessayer.';
            }
          },
        });
    }
  }

  get utilisateur_email(){
    return this.credentials.get('utilisateur_email');
  }
  get utilisateur_mdp(){
    return this.credentials.get('utilisateur_mdp');
  }

  askBack() {
    this.router.navigate(['/home'])
  }
}
