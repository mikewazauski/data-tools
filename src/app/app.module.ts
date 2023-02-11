import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTranslateModule } from './modules/translate.module';
import { ConfigurationService } from './services/configuration/configuration.service';
import { PagesModule } from './pages/pages.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AppTranslateModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    PagesModule,
    AppStoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory:
        (envConfigService: ConfigurationService) => (): Promise<boolean> =>
          envConfigService.load(),
      deps: [ConfigurationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
