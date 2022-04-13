import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Article } from 'skiosa-orm';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecomendationService {

  constructor(private http: HttpClient) { }

  getGeneralArticles(): Observable<Article[]> {
      return this.http.post<RecommendedArticleResponse>(environment.coreApi + '/graphql', {
          query: 
            "{\
                recommendedArticles(seed:1, PaginationArg: {skip:1, take:3}){\
                    id,\
                    title,\
                    description,\
                    url,\
                }\
            }"
      }).pipe(
        map(artRes => artRes.data.recommendedArticles)
      )
  }

}

interface RecommendedArticleResponse {
    data: {
        recommendedArticles: Article[]
    }
}
