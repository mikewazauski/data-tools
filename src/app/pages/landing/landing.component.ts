import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthService } from '../../services/auth/auth.service';
import { isLoading, stopLoading } from '../../store/actions/ui.actions';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  loginForm!: FormGroup;
  hidePassword!: boolean;
  isLoading!: boolean;
  subscription!: Subscription;

  get invalidLogin(): boolean {
    return this.loginForm.invalid || this.isLoading;
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

    this.subscription = this.store.select('ui').subscribe({
      next: ({ isLoading }) => {
        this.isLoading = isLoading;
      },
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.store.dispatch(isLoading());

    this.authService
      .loginUser(username, password)
      .then(() => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          confirmButtonColor: '#1877f2',
        });
        console.error(error);
      });
  }
}
