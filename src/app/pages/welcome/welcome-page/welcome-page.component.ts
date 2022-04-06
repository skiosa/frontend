import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from 'src/app/core/services/api.service';
import { Joke } from 'src/app/models/joke.model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  public isLoggedIn = false;

  joke: Joke = {
    joke: 'No joke for you!'
  }

  constructor(private apiService: ApiService, private readonly auth: KeycloakService) {
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.auth.isLoggedIn();

    if (this.isLoggedIn) {
      console.log("Logged in");
    }
    this.getJoke();
  }

  login() {
    this.auth.login();
  }


  getJoke() {
    this.apiService.getJoke().subscribe(joke => {
      if (joke != null) {
        this.joke = joke;
      }
    });
  }

}
