import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{
	@Input() title = ''
	@Input() icon = ''
	iconLink = ''
	ngOnInit(): void {
		this.iconLink = `assets/icons/${this.icon}.svg`;
	}
}
