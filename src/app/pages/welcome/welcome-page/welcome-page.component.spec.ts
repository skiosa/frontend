import { TestBed } from '@angular/core/testing';
import { KeycloakAngularModule } from 'keycloak-angular';
import { WelcomePageComponent } from './welcome-page.component';
import { HttpClientModule } from '@angular/common/http';

describe('WelcomePageComponent', () => {
  let comp: WelcomePageComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
      providers: [WelcomePageComponent],
      imports: [KeycloakAngularModule, HttpClientModule],
    }).compileComponents();
    comp = TestBed.inject(WelcomePageComponent);
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(WelcomePageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
