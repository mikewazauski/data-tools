import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {
  currentLanguage: string = AppSettings.defaultLocale;

  constructor(private translateService: TranslateService, private http: HttpClient, @Inject(DOCUMENT) private document: any) {
    translateService.addLangs([AppSettings.defaultLocale]);
    translateService.setDefaultLang(AppSettings.defaultLocale);
    translateService.use(AppSettings.defaultLocale);
    this.updateHtmlTag();
  }

  instant(key: string, interpolateParams?: Object | undefined): string {
    if (isEmpty(key)) {
      return '';
    }
    const res = this.translateService.instant(key, interpolateParams);

    return typeof res !== 'string' ? key : res;
  }

  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translateService.get(key, interpolateParams);
  }

  updateHtmlTag(): void {
    this.document.documentElement.setAttribute('lang', this.currentLanguage || AppSettings.defaultLocale);
  }
}
