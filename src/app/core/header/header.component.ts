import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  test: string = "header";

  constructor(private readonly keycloak: KeycloakService) { }
  public isLoggedIn = false;

  async ngOnInit() {
    this.test = "special-header";
    this.isLoggedIn = await this.keycloak.isLoggedIn();

  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

}
