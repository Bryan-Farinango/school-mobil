import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export class POST {
	key: string;
	title: string;
	select: string;
	desc: string;
	timestamp: number;
}

@Injectable({
	providedIn: 'root',
})
export class DBService {
	endpoint = '';
	constructor(private ngFirestore: AngularFirestore, private httpClient: HttpClient) {
		this.endpoint = environment.apiUrl;
	}

	httpHeader = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	createPost(post: POST) {
		return this.ngFirestore.collection('posts').add(post);
	}

	getPosts() {
		return this.ngFirestore
			.collection('posts', (ref) => ref.orderBy('timestamp', 'desc'))
			.snapshotChanges();
	}

	registerUser(data: any) {
		return this.httpClient
			.post<any>(this.endpoint + '/add-mobile-user', JSON.stringify(data), this.httpHeader)
			.pipe(retry(1), catchError(this.processError));
	}

	getUserInfo(data: any) {
		return this.httpClient
			.post<any>(
				this.endpoint + '/get-mobile-user-info',
				JSON.stringify(data),
				this.httpHeader
			)
			.pipe(retry(1), catchError(this.processError));
	}
	processError(err: any) {
		let message = '';
		if (err.error instanceof ErrorEvent) {
			message = err.error.message;
		} else {
			message = `Code: ${err.status}\nMessage: ${err.message}`;
		}
		return throwError(message);
	}

	getRutasForUser(data: any) {
		return this.httpClient
			.post<any>(this.endpoint + '/get-ruta-mobile', JSON.stringify(data), this.httpHeader)
			.pipe(retry(1), catchError(this.processError));
	}

	publicarComunicado(data: any) {
		return this.httpClient
			.post<any>(
				this.endpoint + '/publicar-comunicado',
				JSON.stringify(data),
				this.httpHeader
			)
			.pipe(retry(1), catchError(this.processError));
	}

	getComunicados(data: any) {
		return this.httpClient
			.post<any>(this.endpoint + '/get-comunicados', JSON.stringify(data), this.httpHeader)
			.pipe(retry(1), catchError(this.processError));
	}

	getRutaTransporte(data: any) {
		return this.httpClient
			.post<any>(
				this.endpoint + '/get-ruta-mobile-transporte',
				JSON.stringify(data),
				this.httpHeader
			)
			.pipe(retry(1), catchError(this.processError));
	}

	delComunicados(data: any) {
		return this.httpClient
			.post<any>(this.endpoint + '/del-comunicados', JSON.stringify(data), this.httpHeader)
			.pipe(retry(1), catchError(this.processError));
	}
}
