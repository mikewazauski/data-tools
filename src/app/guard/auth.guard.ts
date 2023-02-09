import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) { }

    canActivate(): Observable<boolean> {
        return this.auth.isAuthenticated().pipe(
            tap((state) => {
                if (!state) {
                    this.router.navigate(['']);
                }
            })
        );
    }
}
