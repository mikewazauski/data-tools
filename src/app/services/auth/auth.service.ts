import { Injectable } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Menu, User } from '../../models/models';
import { setUser, unsetUser } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { clearMenus, setMenus } from '../../store/actions/ui.actions';
import { SSOProviders } from '../../models/enums/sso.enum';
import { OAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSuscription!: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener(): void {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        const providerUserInfo = fuser.providerData[0];
        const user: User = this.getUserInfo(fuser, providerUserInfo);

        this.store.dispatch(setUser({ user }));

        this.userSuscription = this.fireStore
          .collection('menus')
          .valueChanges()
          .subscribe((firestore: any) => {
            const menus: Menu[] = firestore as Menu[];
            this.store.dispatch(setMenus({ menus }));
          });
      } else {
        this.userSuscription?.unsubscribe();
        this.store.dispatch(unsetUser());
        this.store.dispatch(clearMenus());
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
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
    this.userSuscription.unsubscribe();
    this.store.dispatch(unsetUser());
    this.store.dispatch(clearMenus());
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map((fuser) => fuser !== null));
  }

  private getUserInfo(firebaseUser: any, providerUserInfo: any): User {
    let user: User = {
      uid: firebaseUser.uid,
      email: providerUserInfo.email,
      name: providerUserInfo.displayName,
      photoUrl: providerUserInfo
        ? providerUserInfo.photoURL
        : 'assets/img/user-avatar.png',
    };

    if (providerUserInfo.providerId === SSOProviders.google) {
      user.name = firebaseUser.displayName;
    }
    if (providerUserInfo.providerId === SSOProviders.github) {
      user.name = 'No name found';
    }

    return user;
  }
}
