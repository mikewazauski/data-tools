// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:9000/',
  appVersion: '0.0.0.0',
  idleTimeOutMinutes: 5,
  firebase: {
    apiKey: 'AIzaSyCwDWkardnWJodYJ8Cprcb7qyJuGenXaBI',
    authDomain: 'data-tools-de0a7.firebaseapp.com',
    projectId: 'data-tools-de0a7',
    storageBucket: 'data-tools-de0a7.appspot.com',
    messagingSenderId: '705095971825',
    appId: '1:705095971825:web:34203dc684679e8cfe8a50',
    measurementId: 'G-7D7SY3V84H'
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
