// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:9000/',
  appVersion: '0.0.0.0',
  idleTimeOutMinutes: 5,
  firebase: {
    projectId: 'zeek-soporte',
    appId: '1:1010741301447:web:68f86b212892055001aee2',
    storageBucket: 'zeek-soporte.appspot.com',
    apiKey: 'AIzaSyAfAu4MVNP4lq_Eq2ajih3JodClnhsB_C4',
    authDomain: 'zeek-soporte.firebaseapp.com',
    messagingSenderId: '1010741301447',
    measurementId: 'G-X4095Q4LNB',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
