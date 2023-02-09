import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  sidenavToggle = new EventEmitter<void>();

  showSideBarIcon: boolean = false;

  constructor(private authService: AuthService) { }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

}
