import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/models/theme.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  username = ''
  usermail = ''
  isLight = true;
  userEdit = environment.keycloakUserURL;

  constructor(private readonly keycloak: KeycloakService, private readonly theme: ThemeService) { }

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
    });
    this.theme.getTheme().subscribe(theme => {
      this.isLight = (theme === Theme.light);
    });
  }

  /**
   * @author Jonas Eppard
   * @summary Sets the current theme
   * @description Sets the current theme
   * @param {boolean} isLight The theme to set true for light and false for dark
   */
  setTheme(isLight: boolean) {
    this.theme.setTheme(isLight ? Theme.light : Theme.dark);
  }

  /**
   * @author Jonas Eppard
   * @summary Logs the user out
   * @description Logs the user out
   */
  logout() {
    this.keycloak.logout(window.location.origin);
  }
}
