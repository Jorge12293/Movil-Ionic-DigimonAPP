import { Injectable } from '@angular/core';
import { AlertButton, AlertController, LoadingController, ModalController, ModalOptions, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLanguageService } from './translate-language.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private translate:TranslateLanguageService,
    private alertCtrl: AlertController,
  ) { }

  async showAlert(message: string, header: string, buttonArray?: (string | AlertButton)[] | undefined) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttonArray ? buttonArray : ['Ok']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async showToast(msg: string, color: any, position: "top" | "bottom" | "middle", duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      color: color,
      position: position
    });
    toast.present();
  }

  errorToast(msg?: string, duration = 4000) {
    this.showToast(msg ? msg : this.translate.getTranslate("error.global"), 'danger', 'bottom', duration);
  }

  warningToast(msg?: string, duration = 4000) {
    this.showToast(msg ? msg : this.translate.getTranslate("error.global"), 'warning', 'bottom', duration);
  }

 async showLoader(msg:string ='Loading'){
  const loader = await this.loadingCtrl.create({
    message: msg,
    spinner:'bubbles',
    animated: true
  });
  await loader.present();
  return loader;
 }

  async createModal(options: ModalOptions) {
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }

  modalDismiss(val?: any) {
    let data: any = val ? val : null;
    this.modalCtrl.dismiss(data);
  }

}
