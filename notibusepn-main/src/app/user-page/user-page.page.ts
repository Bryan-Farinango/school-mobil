import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

import { PopoverComponent } from '../components/popover/popover.component';

import { AuthService } from '../services/auth.service';

import { POST, DBService } from '../services/db.service';
import { MenuController } from '@ionic/angular';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.page.html',
	styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {
	public folder: string;

	posts: POST[];

	postForm2: FormGroup;
	successMsg = '';
	errorMsg = '';

	errorMsgDesc = {
		title: [
			{
				type: 'required',
				message: 'Provide title.',
			},
		],
		select: [
			{
				type: 'required',
				message: 'Select is required.',
			},
		],
		desc: [
			{
				type: 'required',
				message: 'Description is required.',
			},
		],
	};

	constructor(
		private router: Router,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		public popoverController: PopoverController,
		private dbService: DBService,
		private fb: FormBuilder
	) {}

	async openPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			cssClass: 'popover_setting',
			translucent: true,
		});
		return await popover.present();
	}
	ngOnInit() {
		//window.location.reload();
		this.authService.userDetails().subscribe(
			(response) => {
				if (response === null) {
					this.router.navigateByUrl('welcome');
				}
			},
			(error) => {
				console.log(error);
			}
		);

		this.folder = this.activatedRoute.snapshot.paramMap.get('id');

		this.dbService.getPosts().subscribe((res) => {
			this.posts = res.map((t) => ({
				key: t.payload.doc.id,
				...(t.payload.doc.data() as POST),
			}));
		});

		this.postForm2 = this.fb.group({
			title: new FormControl('', Validators.compose([Validators.required])),
			select: new FormControl('', Validators.compose([Validators.required])),
			desc: new FormControl('', Validators.compose([Validators.required])),
			timestamp: new FormControl(new Date().getTime()),
		});
	}

	publishPost(value) {
		//console.log(this.postForm.value)
		this.dbService.createPost(value).then(
			(response) => {
				this.postForm2.reset();
				this.postForm2.setValue({
					title: '',
					select: '',
					desc: '',
					timestamp: new Date().getTime(),
				});

				this.errorMsg = '';
				this.router.navigateByUrl('/dashboard/Screen1');
			},
			(error) => {
				this.errorMsg = error.message;
				this.successMsg = '';
			}
		);
	}
}