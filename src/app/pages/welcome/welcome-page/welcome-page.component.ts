import { Component, } from '@angular/core';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  public isLoggedIn = false;
  userProfile: KeycloakProfile | undefined;

  joke: Joke = {
    joke: 'No joke for you!'
  }

  constructor(private apiService: ApiService, private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.getJoke();
  }

  getJoke() {
    this.apiService.getJoke().subscribe(joke => {
      if (joke != null) {
        this.joke = joke;
      }
    });
  }

}
