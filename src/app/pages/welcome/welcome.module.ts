import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		WelcomePageComponent
	],
	imports: [
		CommonModule,
        SharedModule,
		WelcomeRoutingModule,
		HttpClientModule
	],
	providers: []
})
export class WelcomeModule { }
