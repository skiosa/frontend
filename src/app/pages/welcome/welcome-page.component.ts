import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GENERAL_RECOMMENDATION_QUERY, GENERAL_RECOMMENDATION_QUERY_RESULT } from 'src/app/core/queries/recommendation';
import { getColorSeedFromArticle } from 'src/app/util/randomColor';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
	constructor(private apollo: Apollo) {}

	public recommendedArticles: GENERAL_RECOMMENDATION_QUERY_RESULT['recommendedArticles'] = [];
	private seed: number = Math.random();
	private skip = 0;
	private take = 10;

	ngOnInit(): void {
		this.apollo
			.watchQuery<GENERAL_RECOMMENDATION_QUERY_RESULT>({
				query: GENERAL_RECOMMENDATION_QUERY,
				variables: {
					seed: this.seed,
					PaginationArg: {
						skip: this.skip,
						take: this.take,
					},
				},
			})
			.valueChanges.subscribe(({ data }) => {
				this.recommendedArticles = data.recommendedArticles;
			});
	}

	getColorSeed(article: GENERAL_RECOMMENDATION_QUERY_RESULT["recommendedArticles"][0]): number {
		return getColorSeedFromArticle(article);
	  }
}
