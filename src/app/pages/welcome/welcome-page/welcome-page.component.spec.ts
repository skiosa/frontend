import { TestBed } from '@angular/core/testing';
import { KeycloakAngularModule } from 'keycloak-angular';
import { WelcomePageComponent } from './welcome-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RecomendationService } from 'src/app/core/services/recomendation.service';

describe('WelcomePageComponent', () => {
  let comp: WelcomePageComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomePageComponent
      ],
      providers: [
          WelcomePageComponent,
          {provide: RecomendationService, useClass: MockRecomendationService}
      ],
      imports: [
        KeycloakAngularModule,
        HttpClientModule
      ],
    }).compileComponents();
    comp = TestBed.inject(WelcomePageComponent)
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(WelcomePageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not trim short strings', () => {
      const text = 'abc';
      const res = comp.shortenedText(text);
      expect(res).toEqual(text);
  })

  it('should trim long strings', () => {
      const text = 'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde abcdeabcde';
      const expected = 'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde...';
      const res = comp.shortenedText(text);
      expect(res).toEqual(expected);
  })
});

class MockRecomendationService {
    getGeneralArticles = []
}
