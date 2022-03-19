import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Joke } from 'src/app/models/joke.model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  joke: Joke = {
    joke: 'No joke for you!'
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
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
