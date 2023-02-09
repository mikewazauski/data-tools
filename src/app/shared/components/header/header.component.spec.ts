import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../store/app.reducer';
import { environment } from '../../../../environments/environment';

import { HeaderComponent } from './header.component';
import { AppTranslateModule } from '../../../modules/translate.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent], imports: [AngularFirestoreModule,
        AngularFirestoreModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule, StoreModule.forRoot(appReducers), AppTranslateModule, HttpClientModule, TranslateModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
