import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'data-tools';

  private subscription: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const subscription = this.auth.authState.subscribe();
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.auth
      .logout()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((err) => console.error(err));
  }
}
