import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
	let component: ArticleComponent;
	let fixture: ComponentFixture<ArticleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ArticleComponent],
			providers: [
				{ provide: Apollo, useValue: {} },
				{ provide: KeycloakService, useValue: {} },
			]
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
