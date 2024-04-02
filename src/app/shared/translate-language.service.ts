import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateLanguageService {

  constructor(
    private translate: TranslateService,
  ) { }

  getTranslate(key:string):string{
    return this.translate.instant(key);
  }
}
