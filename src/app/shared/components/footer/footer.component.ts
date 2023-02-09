import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration/configuration.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private configurationService: ConfigurationService) { }

  date?: Date;
  appVersion?: string;

  ngOnInit(): void {
    this.date = new Date();
    this.appVersion = this.configurationService.environment?.appVersion;
  }
}
