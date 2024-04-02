import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutes } from '../urls/app-routes';

const routes: Routes = [
  {
    path:'',
    redirectTo: AppRoutes.login,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.login,
    component:LoginComponent
  },
  {
    path: AppRoutes.register,
    component:RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
