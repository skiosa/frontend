import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Article } from 'skiosa-orm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {
  constructor(private http: HttpClient) {}

  /**
   * @author Amos Gross
   * @summary fetches recommended articles
   * @description uses a seed, skip and take number to take recomendations from core service
   * @param {number} seed - Randomization seed for initial recomendations
   * @param {number} skip - index to start at (pagigantion)
   * @param {number} take - number of items to fetch (pagigantion)
   * @returns {Article[]} Recomended Articles
   */
  getGeneralArticles(
    seed: number,
    skip: number,
    take: number
  ): Observable<Article[]> {
    return this.http
      .post<RecommendedArticleResponse>(environment.coreApi + '/graphql', {
        query: `{\
                recommendedArticles(seed:${seed}, PaginationArg: {skip:${skip}, take:${take}}){\
                    id,\
                    title,\
                    description,\
                    url,\
                }\
            }`,
      })
      .pipe(map((artRes) => artRes.data.recommendedArticles));
  }
}

interface RecommendedArticleResponse {
  data: {
    recommendedArticles: Article[];
  };
}
