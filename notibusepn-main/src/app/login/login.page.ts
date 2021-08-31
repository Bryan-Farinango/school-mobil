import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DBService } from '../services/db.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	userForm: FormGroup;
	successMsg = '';
	errorMsg = '';
	dataObjLogin = {
		email: '',
	};
	errorMsgDesc = {
		email: [
			{
				type: 'required',
				message: 'Email requerido.',
			},
			{
				type: 'pattern',
				message: 'Email no válido.',
			},
		],
		password: [
			{
				type: 'required',
				message: 'Contraseña requerida.',
			},
			{
				type: 'minlength',
				message: 'La contraseña debe tener mínimo 6 caracteres.',
			},
		],
	};

	constructor(
		private router: Router,
		private authService: AuthService,
		private fb: FormBuilder,
		private adminService: DBService
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
				const { email } = this.userForm.value;
				this.dataObjLogin.email = email;

				this.adminService.getUserInfo(this.dataObjLogin).subscribe(
					(result) => {
						if (result.resultado == true) {
							window.localStorage.setItem('usuario_id', result.objeto.usuario_id);
							window.localStorage.setItem('user_web', result.objeto.user_web);
							window.localStorage.setItem('email', result.objeto.email);
							window.localStorage.setItem('rol', result.objeto.rol);
							if (result.objeto.rol == 'mobil_user') {
								//this.router.navigateByUrl('/user-page/Screen1');
								this.router.navigateByUrl('/user-page/Comunicados');
							} else {
								this.router.navigateByUrl('/dashboard/Notificaciones');
							}
						} else {
						}
					},
					(error) => {
						console.log(error);
					}
				);
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
