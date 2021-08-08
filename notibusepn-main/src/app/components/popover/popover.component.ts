import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
	userName: string;
	userEmail: string;

	constructor(
		private router: Router,
		private popoverController: PopoverController,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.authService.userDetails().subscribe(
			(response) => {
				if (response !== null) {
					this.userName = response.displayName;
					this.userEmail = response.email;
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
}
