import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';
import { CHANGE_BOOKMARK_MUTATION } from 'src/app/core/mutations/bookmark';
import { GENERAL_ARTIKLE_LIKE_MUTATION } from 'src/app/core/mutations/likes';
import { DEFAULT_PASTEL_COLOR, generateRandomColor } from 'src/app/util/randomColor';
import { shortenedText } from 'src/app/util/textShorter';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
	@Input() articleTitle = '';
	@Input() articleDescription = '';
	@Input() colorSeed = 0;
	@Input() likeStatus = false;
	@Input() id: number = 0;
	@Input() bookmarked = false;
	@Output() bookmarkedChange = new EventEmitter<boolean>();
	@Output() likeChange = new EventEmitter<boolean>();
	color: string = DEFAULT_PASTEL_COLOR;

	constructor(private readonly apollo: Apollo, private readonly keycloak: KeycloakService) {}

	ngOnInit(): void {
		this.color = generateRandomColor(this.colorSeed);
		this.articleTitle = shortenedText(this.articleTitle);
		this.articleDescription = shortenedText(this.articleDescription);
	}

	/**
	 * @author Marcel Alex
	 * @summary Changes the Like status of the article
	 * @description Checks if user is logged in and if so, changes the Like status of the article
	 * @param {MouseEvent} event - The mouse event to stop propagation
	 */

	public changeLikeStatus(event: MouseEvent): void {
		event.stopPropagation();
		this.keycloak.isLoggedIn().then((isLoggedIn) => {
			if (!isLoggedIn) {
				this.keycloak.login();
			}
			this.apollo
				.mutate({
					mutation: GENERAL_ARTIKLE_LIKE_MUTATION,
					variables: {
						articleId: this.id,
						isLiked: !this.likeStatus,
					},
				})
				.subscribe((data) => {
					if (!data.errors) {
						this.likeStatus = data.data!.changeLike;
						this.likeChange.emit(this.likeStatus);
					}
				});
		});
	}

	/**
	 * @author Jonas Eppard
	 * @summary Changes the bookmarked status of the article
	 * @description Checks if user is logged in and if so, changes the bookmarked status of the article
	 * @param {MouseEvent} event - The mouse event to stop propagation
	 */
	toggleBookmark(event: MouseEvent): void {
		event.stopPropagation();
		this.keycloak.isLoggedIn().then((loggedIn) => {
			if (!loggedIn) {
				this.keycloak.login();
			} else {
				this.apollo
					.mutate({
						mutation: CHANGE_BOOKMARK_MUTATION,
						variables: {
							isBookmarked: !this.bookmarked,
							articleId: this.id,
						},
					})
					.subscribe((data) => {
						if (!data.errors) {
							this.bookmarked = data.data!.changeBookmark;
							this.bookmarkedChange.emit(this.bookmarked);
						}
					});
			}
		});
	}
}
