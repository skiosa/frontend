import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GENERAL_RECOMMENDATION_QUERY, GENERAL_RECOMMENDATION_QUERY_RESULT } from 'src/app/core/queries/recommendation';

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

	/**
	 * @author Amos Gross
	 * @summary shortens text to 80 chars
	 * @description shortens a given string down and adds '...' if needed
	 * @param {string} text - string to shorten
	 * @returns {string} shortened text
	 */
	public shortenedText(text: string): string {
		if (text.length <= 80) {
			return text;
		} else {
			let trimLen = 77;
			while (text.charAt(trimLen) !== ' ' || trimLen === 0) {
				trimLen--;
			}

			return text.substring(0, trimLen) + '...';
		}
	}
}
