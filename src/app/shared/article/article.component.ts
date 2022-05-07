import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';
import { CHANGE_BOOKMARK_MUTATION } from 'src/app/core/queries/bookmarks';
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
	@Input() bookmarked = false;
	@Input() id: number = 0;
	@Output() bookmarkedChange = new EventEmitter<boolean>();
	color: string = DEFAULT_PASTEL_COLOR;

	constructor(private readonly apollo: Apollo, private readonly keycloak: KeycloakService) {}

	ngOnInit(): void {
		this.color = generateRandomColor(this.colorSeed);
		this.articleTitle = shortenedText(this.articleTitle);
		this.articleDescription = shortenedText(this.articleDescription);
	}

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
