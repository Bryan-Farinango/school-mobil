import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard/Screen1',
		pathMatch: 'full',
	},
	{
		path: 'welcome',
		loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
	},
	{
		path: 'register',
		loadChildren: () => import('./register/register.module').then((m) => m.RegisterPageModule),
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
	},
	{
		path: 'dashboard/:id',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
