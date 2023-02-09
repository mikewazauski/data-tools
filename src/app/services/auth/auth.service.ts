import { Injectable } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/models';
import { setUser, unsetUser } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User | null;
  private userSuscription!: Subscription;

  constructor(private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener(): void {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSuscription = this.fireStore
          .doc(`${fuser?.uid}/user`)
          .valueChanges()
          .subscribe((fireStoreUser: any) => {
            const user: User = User.fromFireBase(fireStoreUser);
            this._user = user;
            this.store.dispatch(setUser({ user }));
          });
      } else {
        this._user = null;
        this.userSuscription?.unsubscribe();
        this.store.dispatch(unsetUser());
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    this.userSuscription.unsubscribe();
    this.store.dispatch(unsetUser());
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map((fuser) => fuser !== null));
  }

  get user(): any {
    return { ...this._user };
  }
}
