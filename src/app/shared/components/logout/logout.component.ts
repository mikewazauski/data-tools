import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private auth: AuthService, private router: Router) { }

  @Input() user!: User | null | undefined;

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['']);
  }
}
