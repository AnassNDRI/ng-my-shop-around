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
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required, Validators.minLength(6)]],
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
              console.log('Login ok', res);
              this.authService.isAuthenticated.next(true);
              this.router.navigate(['/home']);
            }else {
              this.authService.isAuthenticated.next(false);
              console.log(res.message);
              this.router.navigate(['/login']);
            }
          },
          error: (error) => {
            this.error =  `La combinaison du mot de passe et de l'adresse mail est incorrecte. \n
                            Veuillez recommencer SVP`;
          }
        });
    }
  }

  get email(){
    return this.credentials.get('email');
  }
  get mdp(){
    return this.credentials.get('mdp');
  }

  askBack() {
    this.router.navigate(['/home'])
  }
}
