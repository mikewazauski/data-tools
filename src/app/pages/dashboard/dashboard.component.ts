import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { AppState } from '../../store/app.reducer';
import { isLoading, stopLoading } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs!: Subscription;
  dashboardSubs!: Subscription;
  dashboardData = [];
  tableColumnsNames = 'dashboard.table.';

  constructor(private store: Store<AppState>, private service: DataService) {}

  ngOnInit(): void {
    this.store.dispatch(isLoading());

    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(() => {
        this.dashboardSubs = this.service.initDashboardListener().subscribe({
          next: (data: any) => {
            this.dashboardData = data;
            this.store.dispatch(stopLoading());
          },
          error: () => this.store.dispatch(stopLoading()),
        });
      });
  }
  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.dashboardSubs?.unsubscribe();
  }
}
