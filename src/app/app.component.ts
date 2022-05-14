import { Component, OnInit } from '@angular/core';
import { FaviconService } from './core/services/favicon.service';
import { ThemeService } from './core/services/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(private faviconService: FaviconService, private readonly theme: ThemeService) {}

	ngOnInit(): void {
		this.faviconService.changeFavicon();
		this.theme.loadTheme();
	}
	title = 'skiosa-frontend';
}
