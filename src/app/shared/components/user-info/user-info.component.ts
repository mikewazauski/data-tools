import { Component, Input } from '@angular/core';
import { User } from '../../../models/models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  constructor() { }

  @Input() user!: User | null | undefined;
}
