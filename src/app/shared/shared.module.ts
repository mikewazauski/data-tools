import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../modules/material.module';
import { AppTranslateModule } from '../modules/translate.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent,
    UserInfoComponent,
    NavMenuComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProgressBarComponent,
    NavMenuComponent,
    TableComponent,
    MaterialModule,
    TranslateModule,
    AppTranslateModule,
  ],
})
export class SharedModule {}
