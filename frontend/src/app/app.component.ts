import {Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LayoutService} from "./services/layout.service";
import {PanierService} from "./services/panier.service";
import {LignePanier} from "./models/ligne-panier";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy  {
  isAuth: null | boolean = false;
  title = 'shopAround';
  myToken: any;
  headerVisible = true;
  nbArticlesPanier = 0;
  panierSubscription!: Subscription;
  isAdmin = false;
  isEmploye = false;


  constructor(private authService: AuthenticationService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              public layoutService: LayoutService,
              private panierService: PanierService,
              // private translate: TranslateService
  ) {
    // this.authenticationService.isAuthenticated.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.panierService.loadPanier();
    this.panierSubscription = this.panierService.panier$.subscribe((panier: LignePanier[]) => {
      this.nbArticlesPanier = 0;
      for (let ligne of panier) {
        this.nbArticlesPanier += ligne.quantite;
      }
    });

    console.log('isAuth before : ' , this.isAuth);
    this.myToken = sessionStorage.getItem('my-token');
    if(this.myToken){
      this.isAuth = true;
      this.authService.isAuthenticated.next(true);
    }else{
      this.isAuth=false;
      this.authService.isAuthenticated.next(false);
    }

    this.authService.isAuthenticated.subscribe( auth => {
      this.isAuth = auth;
      this.isAdmin = this.authService.isAdmin;
      this.isEmploye = this.authService.isEmploye;
      console.log('----->', this.isEmploye);
    });

    this.layoutService.isHeaderVisible$.subscribe(headerVisible => {
      this.headerVisible = headerVisible;
      this.cdr.detectChanges();
    });

    console.log('isAuth : ' , this.isAuth);
  }

  ngOnDestroy() {
    this.panierSubscription.unsubscribe();
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this.panierService.clear();
    this.router.navigate(['/home']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  loogout() {

  }
}
