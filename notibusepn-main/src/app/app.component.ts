import { Component } from '@angular/core';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	public userRol: any;
	aux: boolean;
	public appPages = [
		{ title: 'Screen1', url: '/dashboard/Screen1', icon: 'paper-plane' },
		{ title: 'Screen2', url: '/dashboard/Screen2', icon: 'paper-plane' },
	];
	public appPagesUser = [
		{ title: 'Comunicados', url: '/user-page/Screen1', icon: 'paper-plane' },
		{ title: 'Publicar', url: '/user-page/Screen2', icon: 'paper-plane' },
	];
	constructor() {
		this.aux = false;
		this.userRol = window.localStorage.getItem('rol');
		console.log(this.userRol);
		//mobil_user
	}
}
