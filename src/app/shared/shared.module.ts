import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../modules/material.module';
import { AppTranslateModule } from '../modules/translate.module';
import { LogoutComponent } from './components/logout/logout.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent,
    LogoutComponent,
    NavMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProgressBarComponent,
    NavMenuComponent,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    AppTranslateModule,
  ],
})
export class SharedModule {}
