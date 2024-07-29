import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./components/enregistrer/register.component";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNoteFoundComponent } from "./components/page-note-found/page-note-found.component";
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, 
  { path: 'panier', loadChildren: () => import('./components/panier/panier.module').then(m => m.PanierModule) },
  { path: 'articles', loadChildren: () => import('./components/produits/produits.module').then(m => m.ProduitsModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adresses', loadChildren: () => import('./components/adresse/adresse.module').then(m => m.AdresseModule), canActivate: [AuthGuard]},
  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.profileModule), canActivate: [AuthGuard]},
  { path: 'pagenotfound', component: PageNoteFoundComponent},
  { path: '**', redirectTo: 'pagenotfound' } // Redirection vers la page non trouvée pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
