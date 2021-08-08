import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

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
	constructor(private ngFirestore: AngularFirestore) {}

	createPost(post: POST) {
		return this.ngFirestore.collection('posts').add(post);
	}

	getPosts() {
		return this.ngFirestore
			.collection('posts', (ref) => ref.orderBy('timestamp', 'desc'))
			.snapshotChanges();
	}
}
