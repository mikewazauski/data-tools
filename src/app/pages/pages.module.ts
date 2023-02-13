import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LandingComponent, NotFoundComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
})
export class PagesModule {}
