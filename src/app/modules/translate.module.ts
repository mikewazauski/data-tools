import localeEn from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { AppTranslateService } from '../shared/translate/translate.service';

export function createTranslateHttpLoader(
  http: HttpClient
): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json?v=' + Date.now());
}

export function createLocaleIdFactory(
  translateService: AppTranslateService
): string {
  return translateService.currentLanguage || AppSettings.defaultLocale;
}

registerLocaleData(localeEn, AppSettings.defaultLocale);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateHttpLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: createLocaleIdFactory,
      deps: [AppTranslateService],
    },
  ],
})
export class AppTranslateModule { }
