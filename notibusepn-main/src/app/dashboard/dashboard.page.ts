import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

import { PopoverComponent } from '../components/popover/popover.component';
import { TransportistaPopoverComponent } from '../components/popover-driver/transportista-popover/transportista-popover.component';
import { AuthService } from '../services/auth.service';

import { POST, DBService } from '../services/db.service';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
	public folder: string;
	error: boolean;
	temaOptions = [];
	posts: POST[];
	rutaOptions = ['ruta1', 'ruta2', 'ruta3'];
	postForm2: FormGroup;
	successMsg = '';
	errorMsg = '';
	dataObjGetRuta = {
		email: '',
	};
	dataObjPublicar = {
		ruta_id: '',
		titulo: '',
		asunto: '',
		mensaje: '',
		fecha: <string>'',
		transportista_email: '',
	};

	dataObjGetComunicados = {
		ruta_id: '',
	};
	errorMsgDesc = {
		title: [
			{
				type: 'required',
				message: 'Titulo requerido.',
			},
		],
		select: [
			{
				type: 'required',
				message: 'Asunto requrido.',
			},
		],
		desc: [
			{
				type: 'required',
				message: 'Mensaje requerido.',
			},
		],
	};
	public userEmail;
	responseRutas: any;
	responseComunicados: any;
	auxIdRuta: any;
	constructor(
		private datePipe: DatePipe,
		private router: Router,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		public popoverController: PopoverController,
		private dbService: DBService,
		private fb: FormBuilder,
		public adminService: DBService
	) {
		this.temaOptions = environment.themeOptions;
		this.error = false;
	}

	async openPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: TransportistaPopoverComponent,
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
				} else {
					this.userEmail = response.email;
					this.dataObjGetRuta.email = this.userEmail;
					this.adminService.getRutaTransporte(this.dataObjGetRuta).subscribe(
						(result) => {
							if (result.resultado == true) {
								this.responseRutas = result.objeto;

								console.log(this.responseRutas);
							} else {
							}
						},
						(error) => {
							console.log(error);
						}
					);
				}
			},
			(error) => {
				console.log(error);
			}
		);

		this.getComunicados();

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
		//console.log(this.postForm.value)

		const { title, select, desc, timestamp } = this.postForm2.value;
		if (this.auxIdRuta === undefined) {
			this.error = true;

			return;
		}
		this.dataObjPublicar.titulo = title;
		this.dataObjPublicar.asunto = select;
		this.dataObjPublicar.mensaje = desc;
		this.dataObjPublicar.fecha = this.datePipe.transform(timestamp, 'dd/MMM/yyyy hh:mm:ss');
		this.dataObjPublicar.ruta_id = this.auxIdRuta;
		this.dataObjPublicar.transportista_email = this.userEmail;
		this.adminService.publicarComunicado(this.dataObjPublicar).subscribe(
			(result) => {
				if (result.resultado == true) {
					this.router.navigateByUrl('/dashboard/Notificaciones');
				} else {
				}
			},
			(error) => {
				console.log(error);
			}
		);
		console.log(this.dataObjPublicar);
	}
	optionsFn(val: any) {
		const test = val;
		this.auxIdRuta = test.detail.value;
		this.getComunicados();
	}

	postChange(val: any) {
		const test = val;
		this.auxIdRuta = test.detail.value;
	}
	getComunicados() {
		this.dataObjGetComunicados.ruta_id = this.auxIdRuta;
		this.adminService.getComunicados(this.dataObjGetComunicados).subscribe(
			(result) => {
				if (result.resultado == true) {
					this.responseComunicados = result.comunicados;
					console.log(this.responseComunicados);
				} else {
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}

	delComunicados() {
		this.dataObjGetRuta.email = this.userEmail;
		this.adminService.delComunicados(this.dataObjGetRuta).subscribe(
			(result) => {
				if (result.resultado == true) {
					this.getComunicados();
				} else {
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
