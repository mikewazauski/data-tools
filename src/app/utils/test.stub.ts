import SpyObj = jasmine.SpyObj;
import { ModuleWithProviders } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppTranslateService } from '../shared/translate/translate.service';

export class TestsStub {
  public static translation = 'translation';

  public static get matDialogRef(): SpyObj<MatDialogRef<any>> {
    return jasmine.createSpyObj('matDialogRef', ['open', 'close']);
  }

  public static get dialogRef(): MatDialogRef<any> {
    return {
      close: () => {},
    } as MatDialogRef<any>;
  }

  public static get matDialog(): SpyObj<MatDialog> {
    const baseName: string = 'matDialog';
    const methodNames: string[] = ['open'];

    const matDialog = jasmine.createSpyObj(baseName, methodNames);
    matDialog.open.and.returnValue(TestsStub.dialogRef);
    return matDialog;
  }

  public static get appTranslateService(): SpyObj<AppTranslateService> {
    const baseName: string = 'appTranslateService';
    const methodNames: string[] = ['instant', 'get', 'updateHtmlTag'];

    const appTranslateService: SpyObj<AppTranslateService> =
      jasmine.createSpyObj(baseName, methodNames);
    appTranslateService.instant.and.returnValue(this.translation);
    appTranslateService.get.and.returnValue(of(this.translation));
    return appTranslateService;
  }

  public static get ngxTranslateService(): SpyObj<TranslateService> {
    const baseName: string = 'ngxTranslateService';
    const methodNames: string[] = [
      'instant',
      'get',
      'addLangs',
      'setDefaultLang',
      'use',
    ];

    const ngxTranslateService: SpyObj<TranslateService> = jasmine.createSpyObj(
      baseName,
      methodNames
    );
    ngxTranslateService.instant.and.returnValue(this.translation);
    ngxTranslateService.get.and.callFake(
      (key: string | Array<string>, interpolateParams?: Object) => {
        if (typeof key === 'string') {
          return of(this.translation);
        }
        return of(key.map(() => this.translation));
      }
    );
    ngxTranslateService.use.and.returnValue(of(true));
    return ngxTranslateService;
  }

  static get translateModule(): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader,
      },
    });
  }
}
