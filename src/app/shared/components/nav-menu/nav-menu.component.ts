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
import { filter, Subscription } from 'rxjs';
import { Menu, NavMenu, User } from '../../../models/models';
import { AppTranslateService } from '../../translate/translate.service';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private translate: AppTranslateService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.menuSubs) {
      this.menuSubs.unsubscribe();
    }
  }

  @Output() closeSideBar = new EventEmitter<void>();
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  subscription!: Subscription;
  menuSubs!: Subscription;
  menus!: Menu[];
  user!: User | null | undefined;

  ngOnInit(): void {
    this.menuSubs = this.translate.get('menus').subscribe((values) => {
      this.subscription = this.store
        .pipe(filter((auth) => auth.user !== null))
        .subscribe({
          next: ({ user, ui }) => {
            this.user = user.user;
            const { menus } = ui;
            this.menus = menus.map((x: Menu) => {
              const menu = this.getMenu(x, values);

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
          },
        });
    });
  }

  closeMenu(): void {
    this.accordion.closeAll();
    this.closeSideBar.emit();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['']);
  }

  private getMenu(x: Menu, json: any): any {
    return json.find((v: any) => v.menuID === x.menuID);
  }
}
