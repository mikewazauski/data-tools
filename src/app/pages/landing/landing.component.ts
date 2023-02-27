import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SSOProviders } from '../../models/enums/sso.enum';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ssoProviders = SSOProviders;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ssoLogin(providerId: string): void {
    this.authService
      .loginSSO(providerId)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
