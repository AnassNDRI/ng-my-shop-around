import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LignePanier } from 'src/app/models/ligne-panier';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LayoutService } from 'src/app/services/layout.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth: null | boolean = false;
  title = 'shopAround';
  myToken: any;

  nbArticlesPanier = 0;
  panierSubscription!: Subscription;
  isAdmin = false;
  isEmploye = false;
  menuOpen = false; // Add this line

  constructor(private authService: AuthenticationService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              public layoutService: LayoutService,
              private panierService: PanierService) { }

  ngOnInit() {
    this.panierService.loadPanier();
    this.panierSubscription = this.panierService.panier$.subscribe((panier: LignePanier[]) => {
      this.nbArticlesPanier = 0;
      for (let ligne of panier) {
        this.nbArticlesPanier += ligne.quantite;
      }
    });

    this.myToken = sessionStorage.getItem('my-token');
    if (this.myToken) {
      this.isAuth = true;
      this.authService.isAuthenticated.next(true);
    } else {
      this.isAuth = false;
      this.authService.isAuthenticated.next(false);
    }

    this.authService.isAuthenticated.subscribe(auth => {
      this.isAuth = auth;
      this.isAdmin = this.authService.isAdmin;
      this.isEmploye = this.authService.isEmploye;
    });

 
  }

  ngOnDestroy() {
    this.panierSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.panierService.clear();
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}