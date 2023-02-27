import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { MaterialModule } from '../../../modules/material.module';
import { AppTranslateModule } from '../../../modules/translate.module';
import { appReducers } from '../../../store/app.reducer';

import { UserInfoComponent } from './user-info.component';

describe('LogoutComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [
        MaterialModule,
        AppTranslateModule,
        HttpClientModule,
        StoreModule.forRoot(appReducers),
        AngularFirestoreModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
