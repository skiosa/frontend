import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{
	@Input() title = ''
	@Input() icon = ''
	@Input() colorSeed = 0;

	iconLink = ''
	ngOnInit(): void {
		this.iconLink = `assets/icons/${this.icon}.svg`;
	}
	/**
   * @author Amos Gross
   * @summary fetches color for article
   * @description preliminary solution for generating colored articles
   * @returns {string} css class for color
   */
	getColor(): string {
		switch (this.colorSeed % 4) {
		case 0:
			return 'color-a';
		case 1:
			return 'color-b';
		case 2:
			return 'color-c';
		case 3:
			return 'color-d';
		default:
			return 'color-a';
		}
	}
}
