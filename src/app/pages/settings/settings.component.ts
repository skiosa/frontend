import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username = ''
  usermail = ''

  constructor(private readonly keycloak: KeycloakService, private router: Router) { }

  ngOnInit(): void {
    this.keycloak.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloak.loadUserProfile().then(userProfile => {
          this.username = userProfile.username ?? ''
          this.usermail = userProfile.email ?? ''
        }).catch(error => {
          console.log(error);
        })
      } else {
        this.keycloak.login();
      }
    })
  }
}

