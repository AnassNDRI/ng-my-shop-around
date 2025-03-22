import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LignePanier } from 'src/app/models/ligne-panier';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LayoutService } from 'src/app/services/layout.service';
import { PanierService } from 'src/app/services/panier.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('menuToggle') menuToggle!: ElementRef<HTMLInputElement>;

  isAuth: null | boolean = false;
  title = 'shopAround';
  myToken: any;
  validate = false;
  nbArticlesPanier = signal<number>(0);
  //totalArticlesPanier = signal<number>(0);
  panier = signal<LignePanier[]>([]);

  panierSubscription!: Subscription;
  isAdmin = false;
  isEmploye = false;
  menuOpen = false; // Add this line

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public layoutService: LayoutService,
    private panierService: PanierService,
    private ngZone: NgZone
  ) {}

  totalArticlesPanier = computed(() => {
    return this.panier().reduce((acc, ligne) => acc + ligne.quantite, 0);
  });

  ngOnInit() {
    this.panierService.loadPanier();
    // Abonnement au panier$ du service
    this.panierSubscription = this.panierService.panier$.subscribe(
      (panier: LignePanier[]) => {
        this.panier.set(panier); // Mettre à jour le signal panier
      }
    );

    this.myToken = sessionStorage.getItem('my-token');
    if (this.myToken) {
      this.isAuth = true;
      this.authService.isAuthenticated.next(true);
    } else {
      this.isAuth = false;
      this.authService.isAuthenticated.next(false);
    }

    this.authService.isAuthenticated.subscribe((auth) => {
      this.isAuth = auth;
      this.isAdmin = this.authService.isAdmin;
      this.isEmploye = this.authService.isEmploye;
    });

    this.panierService.validate$.subscribe((validate) => {
      this.validate = validate;
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

  // Ferme le menu hamburger
  closeMenu(): void {
    if (this.menuToggle && this.menuToggle.nativeElement) {
      this.menuToggle.nativeElement.checked = false;
    }
  }
}
