import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_PASTEL_COLOR, generateRandomColor } from 'src/app/util/randomColor';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
	@Input() title = '';
	@Input() icon = '';
	@Input() colorSeed = 0;
	iconLink = '';
	color: string = DEFAULT_PASTEL_COLOR;

	ngOnInit(): void {
		this.iconLink = `assets/icons/${this.icon}.svg`;
		this.color = generateRandomColor(this.colorSeed);
	}
}
