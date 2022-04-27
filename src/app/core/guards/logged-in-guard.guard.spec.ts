import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { KeycloakAngularModule } from 'keycloak-angular';

import { LoggedInGuard } from './logged-in-guard.guard';

describe('LoggedInGuardGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeycloakAngularModule, HttpClientModule]
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
