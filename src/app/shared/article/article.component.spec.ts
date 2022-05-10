import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';
import { KeycloakAngularModule } from 'keycloak-angular';
import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
	let component: ArticleComponent;
	let fixture: ComponentFixture<ArticleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ArticleComponent],
			imports: [ApolloModule, HttpClientTestingModule, KeycloakAngularModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ArticleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
