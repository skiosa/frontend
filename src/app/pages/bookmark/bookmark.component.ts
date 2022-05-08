import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BOOKMARKS_QUERY, BOOKMARKS_QUERY_RESPONSE } from 'src/app/core/queries/bookmarks';
import { getColorSeedFromArticle } from 'src/app/util/randomColor';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
	constructor(private apollo: Apollo) {}

	public bookmarks: BOOKMARKS_QUERY_RESPONSE['bookmarks'] = [];
	private skip = 0;
	private take = 10;

	ngOnInit(): void {
		this.loadBookmarks();
	}

	loadBookmarks() {
		this.apollo
			.watchQuery<BOOKMARKS_QUERY_RESPONSE>({
				query: BOOKMARKS_QUERY,
				fetchPolicy: 'network-only',
				variables: {
					PaginationArg: {
						skip: this.skip,
						take: this.take,
					},
				},
			})
			.valueChanges.subscribe(({ data }) => {
				this.bookmarks = data.bookmarks;
				console.log(this.bookmarks);
			});
	}

	getColorSeed(article: BOOKMARKS_QUERY_RESPONSE['bookmarks'][0]): number {
		return getColorSeedFromArticle(article);
	}
}
