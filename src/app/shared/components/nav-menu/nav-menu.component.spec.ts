import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { AppStoreModule } from '../../../store/store.module';
import { AppTranslateModule } from '../../../modules/translate.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppTranslateService } from '../../translate/translate.service';
import { of } from 'rxjs';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  // let service: AuthService;
  let translate: AppTranslateService;

  const menuTranslateJson = [
    {
      menuID: 'users',
      name: 'Users',
      values: [
        {
          id: 0,
          name: 'System',
          icon: 'contacts',
        },
      ],
    },
    {
      menuID: 'services',
      name: 'Services',
      values: [
        {
          id: 0,
          name: 'Clients',
          icon: 'group',
        },
        {
          id: 1,
          name: 'Devices',
          icon: 'laptop_mac',
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [
        AppStoreModule,
        AppTranslateModule,
        HttpClientModule,
        AngularFirestoreModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
        TranslateModule,
      ],
      providers: [AuthService, AppTranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    // service = TestBed.inject(AuthService);
    translate = TestBed.inject(AppTranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('logout', () => {
  //   it('should call logout service', () => {
  //     spyOn(service, 'logout').and.returnValue(Promise.resolve());

  //     component.logout();

  //     expect(service.logout).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnInit', () => {
    it('should load menus from user', () => {

      spyOn(translate, 'get').and.returnValue(of(menuTranslateJson));

      //When
      component.ngOnInit();

      expect(translate.get).toHaveBeenCalled();
    });
  });
});
