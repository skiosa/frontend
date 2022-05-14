import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/models/theme.enum';

import { SettingsComponent } from './settings.component';

class KeycloakServiceMock {
	loggedIn = false;
	isLoggedIn() {
		return Promise.resolve(this.loggedIn);
	}
	login() {
		this.loggedIn = true;
	}
}

class ThemeServiceMock {
	theme = new BehaviorSubject<Theme>(Theme.light);
	getTheme() {
		return this.theme.asObservable();
	}
	setTheme(theme: Theme) {
		this.theme.next(theme);
	}
}

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingsComponent],
			providers: [
				{ provide: KeycloakService, useValue: new KeycloakServiceMock() },
				{ provide: ThemeService, useValue: new ThemeServiceMock() },
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
