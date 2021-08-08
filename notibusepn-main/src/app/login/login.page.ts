import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	userForm: FormGroup;
	successMsg = '';
	errorMsg = '';

	errorMsgDesc = {
		email: [
			{
				type: 'required',
				message: 'Provide email.',
			},
			{
				type: 'pattern',
				message: 'Email is not valid.',
			},
		],
		password: [
			{
				type: 'required',
				message: 'Password is required.',
			},
			{
				type: 'minlength',
				message: 'Password length should be 6 characters long.',
			},
		],
	};

	constructor(
		private router: Router,
		private authService: AuthService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.userForm = this.fb.group({
			email: new FormControl(
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
				])
			),
			password: new FormControl(
				'',
				Validators.compose([Validators.minLength(6), Validators.required])
			),
		});
	}

	signIn(value) {
		this.authService.signinUser(value).then(
			(response) => {
				this.errorMsg = '';
				this.router.navigateByUrl('/');
			},
			(error) => {
				this.errorMsg = error.message;
				this.successMsg = '';
			}
		);
	}

	goToSignup() {
		this.router.navigateByUrl('register');
	}
}
