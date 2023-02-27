import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { filter, finalize, Subscription } from 'rxjs';
import { Menu, NavMenu, User } from '../../../models/models';
import { AppTranslateService } from '../../translate/translate.service';
import { MatAccordion } from '@angular/material/expansion';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { setMenus } from '../../../store/actions/ui.actions';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private translate: AppTranslateService,
    private firestore: AngularFirestore
  ) {}

  private subscription = new Subscription();
  private storeMenus: Menu[] = [];
  private translateMenus: [] = [];

  @Output() logout = new EventEmitter<void>();
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  menus!: Menu[];
  user!: User | null | undefined;

  ngOnInit(): void {
    //Subscribe to the store after the translate servide has loaded menu titles
    const storeSubs = this.store
      .pipe(finalize(() => this.translateMenus.length > 0))
      .subscribe({
        next: ({ user, ui }) => {
          this.user = user.user;
          this.storeMenus = ui.menus;
          this.menus = this.buildMenus();
        },
        error: (err) => console.error(err),
      });

    this.subscription.add(storeSubs);

    //Get the menus from firebase and subscribe to changes
    const fireStoreSubscription = this.firestore
      .collection('menus')
      .valueChanges()
      .pipe(filter(() => this.user !== null))
      .subscribe((firestore: any) => {
        const menus: Menu[] = firestore as Menu[];
        this.store.dispatch(setMenus({ menus }));
      });

    this.subscription.add(fireStoreSubscription);

    //Load menus titles from translate service
    const translateService = this.translate.get('menus').subscribe({
      next: (values) => {
        this.translateMenus = values;
      },
    });
    this.subscription.add(translateService);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  userLogout() {
    this.logout.emit();
  }

  closeMenus(): void {
    this.accordion.closeAll();
  }

  private getMenu(x: Menu, json: any): any {
    return json.find((v: any) => v.menuID === x.menuID);
  }

  private buildMenus(): Menu[] {
    return this.storeMenus.map((x: Menu) => {
      const menu = this.getMenu(x, this.translateMenus);

      return {
        menuID: x.menuID,
        name: menu.name,
        icon: menu.icon,
        values: x.values.map((s: NavMenu) => {
          return {
            id: s.id,
            name: menu.values.find((h: any) => h.id === s.id).name,
            path: s.path,
            icon: menu.values.find((h: any) => h.id === s.id).icon,
          };
        }),
      };
    });
  }
}
