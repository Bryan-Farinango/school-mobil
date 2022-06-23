// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	themeOptions: ['General', 'Asistencia', 'Noticias'],
	apiUrl: 'http://157.245.116.195:8888/api',
	production: false,
	firebaseConfig: {
		apiKey: 'AIzaSyBpDAB2JifxO--5ELLqee47eW0Z3bk3RdA',
		authDomain: 'shool-web-mobile.firebaseapp.com',
		projectId: 'shool-web-mobile',
		storageBucket: 'shool-web-mobile.appspot.com',
		messagingSenderId: '961121696554',
		appId: '1:961121696554:web:d1d79ca7ee1022f0e4fc53',
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
