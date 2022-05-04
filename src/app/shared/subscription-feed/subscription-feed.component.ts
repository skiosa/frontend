import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_PASTEL_COLOR, generateRandomColor } from 'src/app/util/randomColor';

@Component({
	selector: 'app-subscription-feed',
	templateUrl: './subscription-feed.component.html',
	styleUrls: ['./subscription-feed.component.css'],
})
export class SubscriptionFeedComponent implements OnInit {
	@Input() feed = { name: '', description: '' };
	@Input() colorSeed = 0;
	@Input() openAction: Function = () => {};
	@Input() closeAction: Function = () => {};

	isOpen = false;

	color: string = DEFAULT_PASTEL_COLOR;

	ngOnInit(): void {
		this.color = generateRandomColor(this.colorSeed);
	}

	onClick() {
		if (this.isOpen) {
			this.closeAction();
		} else {
			this.openAction();
		}
		this.isOpen = !this.isOpen;
	}
}
