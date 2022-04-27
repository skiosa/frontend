import { TestBed, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { KeycloakAngularModule } from 'keycloak-angular';

describe('HeaderComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			imports: [KeycloakAngularModule],
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(HeaderComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it('should change test var after ngOnInit', () => {
		const fixture = TestBed.createComponent(HeaderComponent);
		const app = fixture.componentInstance;
		expect(app.test).toEqual('header');
		app.ngOnInit();
		expect(app.test).toEqual('special-header');
	});
});
