import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DBService } from '../services/db.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	userForm: FormGroup;
	successMsg = '';
	errorMsg = '';
	dataObjRegister = {
		email: '',
		name: '',
	};
	errorMsgDesc = {
		name: [
			{
				type: 'required',
				message: 'Nombre requerido.',
			},
		],
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
				message: 'Número mínimo de caracteres 6.',
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
			name: new FormControl('', Validators.required),
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

	signUp(value) {
		const { name, email } = this.userForm.value;
		console.log('test', name, email);
		this.dataObjRegister.email = email;
		this.dataObjRegister.name = name;
		this.adminService.registerUser(this.dataObjRegister).subscribe(
			(result) => {
				if (result.resultado == true) {
					this.authService.createUser(value).then(
						(response) => {
							this.errorMsg = '';
							this.successMsg = 'New user created.';
						},
						(error) => {
							this.errorMsg = error.message;
							this.successMsg = '';
						}
					);
				} else {
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}

	goToLogin() {
		this.router.navigateByUrl('login');
	}
}
