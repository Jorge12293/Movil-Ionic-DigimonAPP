import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AppRoutes } from './urls/app-routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.pages,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.pages,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.auth,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: '**',
    redirectTo: AppRoutes.pages,
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
