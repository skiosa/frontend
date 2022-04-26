import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  isLoggedIn = true;
  constructor(private readonly keycloak: KeycloakService) {}

  async canActivate() {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    console.log(isLoggedIn);
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      this.keycloak.login();
    }
    return true;
  }
}
