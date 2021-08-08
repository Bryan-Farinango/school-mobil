import { Component } from '@angular/core';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	public appPages = [
		{ title: 'Screen1', url: '/dashboard/Screen1', icon: 'paper-plane' },
		{ title: 'Screen2', url: '/dashboard/Screen2', icon: 'paper-plane' },
	];
	constructor() {}
}
