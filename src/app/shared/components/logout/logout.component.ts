import { Component, Input } from '@angular/core';
import { User } from '../../../models/models';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor() { }

  @Input() user!: User | null | undefined;
}
