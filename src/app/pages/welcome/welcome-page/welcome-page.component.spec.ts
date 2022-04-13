import { async, TestBed } from '@angular/core/testing';
import { KeycloakAngularModule } from 'keycloak-angular';
import { WelcomePageComponent } from './welcome-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('WelcomePageComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				WelcomePageComponent
			],
			imports: [
				KeycloakAngularModule,
				HttpClientModule
			],
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(WelcomePageComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it('should change test var after ngOnInit', () => {
		const fixture = TestBed.createComponent(WelcomePageComponent);
		const app = fixture.componentInstance;
		expect(app.joke.joke).toEqual('No joke for you!');
		app.ngOnInit();
		expect(app.joke.joke).toBeDefined();
	});

});
