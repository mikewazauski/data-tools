import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../store/app.reducer';
import { environment } from '../../../environments/environment';
import { AppRoutingModule } from '../../app-routing.module';

import { LandingComponent } from './landing.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppTranslateModule } from '../../modules/translate.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth/auth.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  // let store: Store<AppState>;
  // let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent], imports: [ReactiveFormsModule,
        RouterTestingModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot(appReducers),
        TranslateModule, AppTranslateModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule], providers: [AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    // store = TestBed.inject(Store);
    // authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
