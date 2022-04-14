import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService } from 'src/app/core/services/api.service';
import { Joke } from 'src/app/models/joke.model';

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
	};

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
