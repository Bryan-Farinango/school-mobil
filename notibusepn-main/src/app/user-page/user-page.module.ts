import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPagePageRoutingModule } from './user-page-routing.module';

import { UserPagePage } from './user-page.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UserPagePageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [UserPagePage],
})
export class UserPagePageModule {}
