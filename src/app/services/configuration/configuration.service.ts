import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Configuration } from '../../models/configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  public environment?: Configuration;

  constructor() { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.environment = environment as Configuration;
      resolve(true);
    });
  }
}
