import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../models/theme.enum';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private currentTheme = new BehaviorSubject(Theme.light);
	constructor() {}

	/**
	 * @author Jonas Eppard
	 * @summary Returns the current theme
	 * @description Returns the current theme as a Observable
	 * @returns {Observable<Theme>} The current theme as a Observable
	 */
	getTheme() {
		return this.currentTheme.asObservable();
	}

	/**
	 * @author Jonas Eppard
	 * @summary Sets the current theme
	 * @description Sets the current theme and saves it to local storage
	 * @param {Theme} theme The theme to set
	 */
	setTheme(theme: Theme) {
		this.currentTheme.next(theme);
		document.documentElement.setAttribute('data-theme', theme.toString());
		this._saveTheme();
	}

	/**
	 * @author Jonas Eppard
	 * @summary Detects the current theme
	 * @description Detects the current theme from css query and sets it
	 */
	_detectTheme() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.setTheme(Theme.dark);
		} else {
			this.setTheme(Theme.light);
		}
	}

	/**
	 * @author Jonas Eppard
	 * @summary Saves the current theme to local storage
	 * @description Saves the current theme to local storage
	 */
	_saveTheme() {
		localStorage.setItem('theme', this.currentTheme.getValue().toString());
	}

	/**
	 * @author Jonas Eppard
	 * @summary Loads the current theme from local storage
	 * @description Loads the current theme from local storage if it exists otherwise detects the current theme and sets it
	 */
	loadTheme() {
		const theme = localStorage.getItem('theme');
		if (theme) {
			this.setTheme(theme === '0' ? Theme.light : Theme.dark);
		} else {
			this._detectTheme();
		}
	}
}
