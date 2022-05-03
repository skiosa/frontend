import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FeedOverviewPageComponent } from './feed-overview-page.component';
import { KeycloakAngularModule } from 'keycloak-angular';

describe('FeedOverviewPageComponent', () => {
	let component: FeedOverviewPageComponent;
	let fixture: ComponentFixture<FeedOverviewPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FeedOverviewPageComponent],
			imports: [ApolloModule, RouterTestingModule, HttpClientTestingModule, KeycloakAngularModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedOverviewPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
