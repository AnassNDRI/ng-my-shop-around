import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './helpers/auto-login.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {PageNoteFoundComponent} from "./components/page-note-found/page-note-found.component";
import {RegisterComponent} from "./components/enregistrer/register.component";


const routes: Routes = [


  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'panier', loadChildren: () => import('./components/panier/panier.module').then(m => m.PanierModule) },
  { path: 'articles', loadChildren: () => import('./components/produits/produits.module').then(m => m.ProduitsModule) },
  { path: 'login', component: LoginComponent, canActivate: [AutoLoginGuard]},
  { path: 'utilisateurs', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: 'register', component: RegisterComponent ,canActivate: [AutoLoginGuard]},
  { path: 'adresses', loadChildren: () => import('./components/adresse/adresse.module').then(m => m.AdresseModule)},
  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.profileModule)},
  { path: 'home', component: HomeComponent },
    { path: 'pargenotfound', component: PageNoteFoundComponent},
 // { path: '', redirectTo:'/pargenotfound', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
