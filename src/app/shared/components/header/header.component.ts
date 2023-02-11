import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { User } from '../../../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  sidenavToggle = new EventEmitter<void>();

  showSideBarIcon: boolean = false;
  user!: User | null | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('user').subscribe(
      {
        next: ({ user }) => {
          this.user = user;
        }
      }
    );
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

}
