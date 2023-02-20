import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SSOProviders } from '../../models/enums/sso.enum';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm!: FormGroup;
  hidePassword!: boolean;
  ssoProviders = SSOProviders;

  get invalidLogin(): boolean {
    return this.loginForm.invalid;
  }

  ngOnInit(): void {
    this.hidePassword = true;
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

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
