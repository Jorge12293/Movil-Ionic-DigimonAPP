import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/firebase/auth.service';
import { AppRoutes } from '../urls/app-routes';
import { NavController } from '@ionic/angular';
import { UserSession } from '../interfaces/user-session';
import { TranslateLanguageService } from '../shared/translate-language.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent  implements OnInit {
  userSession!:UserSession;
  public appPages = [
    { title: this.translate.getTranslate('pages.home.home'), url: AppRoutes.pagesHome, icon: 'home' },
  ];

  constructor(
    private navCtrl: NavController,
    private authService:AuthService,
    private translate: TranslateLanguageService,
  ) {

  }

  ngOnInit() {
    this.loadDataInitial();
  }

  async loadDataInitial(){
    const user = await this.authService.getUserLocal();
    if(user) this.userSession = user;
  }

  closeSession(){
    this.authService.logout();
    this.authService.removeUserLocal();
    this.navCtrl.setDirection('root');
    this.navCtrl.navigateRoot(AppRoutes.authLogin);
  }
}
