import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/firebase/auth.service';
import { UserSession } from '../interfaces/user-session';
import { NavController } from '@ionic/angular';
import { AppRoutes } from '../urls/app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private navCtrl: NavController,
    private authService:AuthService
  ) {}

  async canActivate(): Promise<boolean> {
    const userSession: UserSession | null = await this.authService.getUserLocal();
    if(!userSession || !userSession.emailVerified) {
      this.navCtrl.setDirection('root');
      this.navCtrl.navigateRoot(AppRoutes.authLogin);
      return false;
    }
    return true;
  }
}
