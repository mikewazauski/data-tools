import { TestBed } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../store/app.reducer';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFirestoreModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule, StoreModule.forRoot(appReducers)], providers: [AngularFireAuth]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
