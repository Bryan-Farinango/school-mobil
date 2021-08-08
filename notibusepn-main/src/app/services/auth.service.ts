import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private angularFireAuth: AngularFireAuth) {}

	createUser(value: { email: string; password: string; name: string }) {
		return new Promise<any>((resolve, reject) => {
			this.angularFireAuth
				.createUserWithEmailAndPassword(value.email, value.password)
				.then(
					async (res) => {
						(await this.angularFireAuth.currentUser).updateProfile({
							displayName: value.name,
						});
					},
					(err) => reject(err)
				)
				.then(
					(res) => this.signinUser(value),
					(err) => reject(err)
				)
				.then(
					(res) => resolve(res),
					(err) => reject(err)
				);
		});
	}

	signinUser(value: { email: string; password: string }) {
		return new Promise<any>((resolve, reject) => {
			this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password).then(
				async (res) => {
					if (res.user.emailVerified !== true) {
						(await this.angularFireAuth.currentUser).sendEmailVerification();
						this.signoutUser();
						const errorMessage =
							'Please validate your email address. Kindly check your inbox.';
						alert(errorMessage);
						reject(errorMessage);
					} else {
						resolve(res);
					}
				},
				(err) => reject(err)
			);
		});
	}

	signoutUser() {
		return new Promise<void>((resolve, reject) => {
			if (this.angularFireAuth.currentUser) {
				this.angularFireAuth
					.signOut()
					.then(() => {
						console.log('Sign out');
						resolve();
					})
					.catch(() => {
						reject();
					});
			}
		});
	}

	userDetails() {
		return this.angularFireAuth.user;
	}
}
