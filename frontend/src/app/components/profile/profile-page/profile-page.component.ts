import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  currentUser!: Utilisateur;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getAccount().subscribe({
      next: (utilisateur) => {
        this.currentUser = utilisateur;
        console.log('Profile data:', utilisateur); // Afficher les données du profil
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error('Unexpected error:', error);
        }
      },
      complete: () => {
        console.log('Profile fetch complete');
      },
    });
  }

  Fermer() {
    this.router.navigate(['/home']);
  }
}
