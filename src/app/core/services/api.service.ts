import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from 'src/app/models/joke.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getJoke(): Observable<Joke> {
    return this.http.get<Joke>('https://v2.jokeapi.dev/joke/Any?type=single');
  }
}
