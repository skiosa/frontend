import { Component, OnInit } from '@angular/core';
import { FaviconService } from './core/services/favicon.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(private faviconService: FaviconService) {  }

	ngOnInit(): void {
		this.faviconService.changeFavicon();
	}
  title = 'skiosa-frontend';
}
