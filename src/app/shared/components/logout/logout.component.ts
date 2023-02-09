import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/models';
import { AppState } from '../../../store/app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<AppState>, private auth: AuthService, private router: Router) { }

  user!: User | null | undefined;

  ngOnInit(): void {
    this.store.select('user').subscribe(
      {
        next: ({ user }) => {
          this.user = user;
        }
      }
    );
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['']);
  }

}
