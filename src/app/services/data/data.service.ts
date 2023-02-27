import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  initDashboardListener(): Observable<any> {
    return this.firestore
      .collection('dashboard')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            ...(doc.payload.doc.data() as Object),
          }))
        )
      );
  }
}
