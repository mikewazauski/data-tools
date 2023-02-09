import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../../store/reducers/ui.reducer';
import { AppState } from '../../../store/app.reducer';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  loading?: boolean;
  uiSubscription!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe((ui: State) => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    if (this.uiSubscription) {
      this.uiSubscription.unsubscribe();
    }
  }
}
