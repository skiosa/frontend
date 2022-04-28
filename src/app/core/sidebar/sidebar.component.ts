import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	navigationIsOpen = false

	/**
	 * @author Simon Morgenstern
	 * @summary function opens/closes navigation in mobile view
	 */
	toggleNavigation() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}

}
