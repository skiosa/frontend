import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FaviconService {
	/**
	 * @author Marcel Alex
	 * @summary Changes the favicon based on current settings
	 * @description Changes the favicon based on current settings
	 * @returns {void}
	 */
	changeFavicon() {
		const favIcon = document.getElementById('faviconTag') as HTMLLinkElement;
		if (favIcon) {
			const isDark = window.matchMedia('(prefers-color-scheme: dark)');
			if (isDark.matches) {
				favIcon.href = 'assets/favicons/Favicon_dark.svg';
			} else {
				favIcon.href = 'assets/favicons/Favicon_light.svg';
			}
		}
	}
}
