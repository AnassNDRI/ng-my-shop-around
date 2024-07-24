import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  utilisateur!: Utilisateur;
  error: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      utilisateur_nom: ['', [Validators.required, Validators.minLength(2)]],
      utilisateur_prenom: ['', [Validators.required, Validators.minLength(2)]],
      utilisateur_email: ['', [Validators.required, Validators.email]],
      utilisateur_mdp: ['', [Validators.required, Validators.minLength(6)]],
      utilisateur_date_naissance: [null],
      utilisateur_gsm: [null],
    });
  }

  register() {
    if (this.formGroup.valid) {
      this.authentificationService.register(this.formGroup.value).subscribe({
        next: (res) => {
          if (res) {
            console.log('register ok', res);
            this.authentificationService.isAuthenticated.next(true);
            this.router.navigate(['/home']);
          } else {
            this.authentificationService.isAuthenticated.next(false);
            console.log(res.message);
            this.router.navigate(['/register']);
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

  askBack() {
    this.router.navigate(['/home']);
  }

  askOrder() {
    this.router.navigate(['/home']);
  }
}
