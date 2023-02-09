import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from '../../app.settings';
import { TestsStub } from '../../utils/test.stub';
import { AppTranslateService } from './translate.service';

import SpyObj = jasmine.SpyObj;

describe('AppTranslateServiceService', () => {
  let service: AppTranslateService;
  let ngxTranslateServiceStub: SpyObj<TranslateService>;

  beforeEach(() => {
    ngxTranslateServiceStub = TestsStub.ngxTranslateService;

    TestBed.configureTestingModule({
      imports: [TestsStub.translateModule, HttpClientTestingModule],
      providers: [
        AppTranslateService,
        HttpClient,
        {
          provide: TranslateService,
          useValue: ngxTranslateServiceStub,
        },
      ],
    });
    spyOn(document.documentElement, 'setAttribute');
  });

  beforeEach(inject(
    [AppTranslateService],
    (appTranslateService: AppTranslateService) =>
      (service = appTranslateService)
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init the service', () => {
    expect(ngxTranslateServiceStub.addLangs).toHaveBeenCalledWith([
      AppSettings.defaultLocale,
    ]);
    expect(ngxTranslateServiceStub.setDefaultLang).toHaveBeenCalledWith(
      AppSettings.defaultLocale
    );
    expect(ngxTranslateServiceStub.use).toHaveBeenCalledWith(
      service.currentLanguage
    );
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      'lang',
      AppSettings.defaultLocale
    );
  });

  it('should return empty string when instant is called with empty string', () => {
    const translate = service.instant('');

    expect(translate).toEqual('');
  });

  it('should return a string when instant is called', () => {
    const translation: string = service.instant('general.button.ok');

    expect(translation).toEqual(TestsStub.translation);
    expect(ngxTranslateServiceStub.instant).toHaveBeenCalledWith(
      'general.button.ok',
      undefined
    );
  });

  it('should return an string with an observable when get is called', () => {
    service.get(['t1', 't2']).subscribe({
      next: (translation: string) => {
        expect(translation).toEqual([
          TestsStub.translation,
          TestsStub.translation,
        ]);
        expect(ngxTranslateServiceStub.get).toHaveBeenCalledWith(
          ['t1', 't2'],
          undefined
        );
      },
    });
  });

  it('should update html tag', () => {
    service.updateHtmlTag();

    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      'lang',
      service.currentLanguage
    );
  });

  it('should update html tag using default locale', () => {
    service.currentLanguage = '';

    service.updateHtmlTag();

    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      'lang',
      AppSettings.defaultLocale
    );
  });
});
