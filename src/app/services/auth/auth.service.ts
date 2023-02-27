import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/models';
import { setUser, unsetUser } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { clearMenus } from '../../store/actions/ui.actions';
import { SSOProviders } from '../../models/enums/sso.enum';
import { OAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseUser: User | null = null;

  constructor(private auth: AngularFireAuth, private store: Store<AppState>) {}

  get authState(): Observable<boolean> {
    return this.auth.authState.pipe(
      filter((firebaseUser) => firebaseUser !== null),
      tap((firebaseUser: firebase.default.User | null) => {
        const user: User = this.getUserInfo(firebaseUser!!);
        this.firebaseUser = user;
        this.store.dispatch(setUser({ user }));
      }),
      map(() => this.firebaseUser !== null)
    );
  }

  loginSSO(providerId: string): Promise<any> {
    const oAuthProvider = new OAuthProvider(providerId);
    oAuthProvider.setCustomParameters({
      prompt: 'select_account',
    });

    if (providerId === SSOProviders.facebook)
      oAuthProvider.addScope('public_profile');

    return this.auth.signInWithPopup(oAuthProvider);
  }

  logout(): Promise<void> {
    this.store.dispatch(unsetUser());
    this.store.dispatch(clearMenus());
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map((fuser) => fuser !== null));
  }

  private getUserInfo(firebaseUser: firebase.default.User): User {
    const providerUserInfo = firebaseUser.providerData[0];

    let user: User = {
      uid: firebaseUser.uid,
      email: providerUserInfo!!.email,
      name: providerUserInfo!!.displayName,
      photoUrl: providerUserInfo
        ? providerUserInfo.photoURL
        : 'assets/img/user-avatar.png',
    };

    if (providerUserInfo!!.providerId === SSOProviders.google) {
      user.name = firebaseUser.displayName;
    }
    if (providerUserInfo!!.providerId === SSOProviders.github) {
      user.name = 'No name found';
    }

    return user;
  }
}
