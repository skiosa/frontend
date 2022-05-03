import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';
import { KeycloakAngularModule } from 'keycloak-angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ArticleViewComponent } from './article-view.component';

describe('ArticleComponent', () => {
	let component: ArticleViewComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ArticleViewComponent],
			providers: [ArticleViewComponent],
			imports: [ApolloModule, RouterTestingModule, HttpClientTestingModule, KeycloakAngularModule],
		}).compileComponents();
		component = TestBed.inject(ArticleViewComponent);
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(ArticleViewComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
