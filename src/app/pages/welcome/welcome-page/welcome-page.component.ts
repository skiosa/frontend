import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Article } from 'skiosa-orm';
import { GENERAL_RECOMMENDATION_QUERY } from 'src/app/core/queries/recommendation';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
	constructor(private apollo: Apollo) { }

	public recommendedArticles: Article[] = [];
	private seed: number = Math.random();
	private skip = 0;
	private take = 10;

	ngOnInit(): void {
		this.apollo
			.watchQuery({
				query: GENERAL_RECOMMENDATION_QUERY,
				variables: {
					seed: this.seed,
					PaginationArg: {
						skip: this.skip,
						take: this.take,
					},
				},
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			})
			.valueChanges.subscribe(({ data }: any) => {
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
