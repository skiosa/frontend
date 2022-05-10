import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';
import { KeycloakAngularModule } from 'keycloak-angular';

import { SubscriptionComponent } from './subscription.component';

describe('SubscriptionComponent', () => {
	let component: SubscriptionComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SubscriptionComponent],
			providers: [SubscriptionComponent],
			imports: [KeycloakAngularModule, HttpClientModule, ApolloModule],
		}).compileComponents();
		component = TestBed.inject(SubscriptionComponent);
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(SubscriptionComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
