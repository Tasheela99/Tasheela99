import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'portfolio', pathMatch: 'full'},
  {path: 'portfolio', loadChildren: () => import('./modules/portfolio/portfolio.module').then(m => m.PortfolioModule)},
  {path: 'security', loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)},
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)
  },
];
