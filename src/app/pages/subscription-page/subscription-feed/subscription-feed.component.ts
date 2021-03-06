import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_PASTEL_COLOR, generateRandomColor } from 'src/app/util/randomColor';

@Component({
	selector: 'app-subscription-feed',
	templateUrl: './subscription-feed.component.html',
	styleUrls: ['./subscription-feed.component.css'],
})
export class SubscriptionFeedComponent implements OnInit {
	@Input() feed = { name: '', description: '', id: 0 };
	@Input() colorSeed = 0;
	@Input() openAction: Function = () => {}; // NOSONAR
	@Input() closeAction: Function = () => {}; // NOSONAR

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
