import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { DBService } from 'src/app/services/db.service';
@Component({
	selector: 'app-transportista-popover',
	templateUrl: './transportista-popover.component.html',
	styleUrls: ['./transportista-popover.component.scss'],
})
export class TransportistaPopoverComponent implements OnInit {
	userName: string;
	userEmail: string;
	dataObjLogin = {
		email: '',
	};
	userRol: any;
	constructor(
		private router: Router,
		private popoverController: PopoverController,
		private authService: AuthService,
		public adminService: DBService
	) {}

	ngOnInit() {
		this.authService.userDetails().subscribe(
			(response) => {
				if (response !== null) {
					this.userName = response.displayName;
					this.userEmail = response.email;
					this.dataObjLogin.email = this.userEmail;
					this.adminService.getUserInfo(this.dataObjLogin).subscribe(
						(result) => {
							if (result.resultado == true) {
								if (result.objeto.rol == 'mobil_user') {
									this.userRol = true;
								} else {
									this.userRol = false;
								}
							} else {
							}
						},
						(error) => {
							console.log(error);
						}
					);
				} else {
					this.router.navigateByUrl('welcome');
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
	signOut() {
		this.popoverController.dismiss();
		this.authService
			.signoutUser()
			.then((res) => {
				this.router.navigateByUrl('welcome');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	publicar() {
		this.popoverController.dismiss();
		this.router.navigateByUrl('/dashboard/Publicar');
	}

	notificaciones() {
		this.popoverController.dismiss();
		this.router.navigateByUrl('/dashboard/Notificaciones');
	}
}
