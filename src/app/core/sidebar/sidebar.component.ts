import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	navigationIsOpen = false
	popoverActive = false
	public addFeed: { url: string, name: string, description: string, ttl?: string, loadedURL: boolean, validURL?: boolean } = {
		url: '',
		name: '',
		description: '',
		ttl: undefined,
		loadedURL: false,
		validURL: undefined
	}

	/**
	 * @author Simon Morgenstern
	 * @summary function opens/closes navigation in mobile view
	 */
	toggleNavigation() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}

	/**
	 * @author Jonas Eppard
	 * @summary Toggle popover
	 * @description This function toggles the popover for adding Feeds
	 */
	togglePopover() {
		this.addFeed = {
			url: '',
			name: '',
			description: '',
			ttl: undefined,
			loadedURL: false,
			validURL: undefined
		}
		this.popoverActive = !this.popoverActive;
	}

	isInt(value: string | undefined): boolean | undefined {
		if (value === undefined) return undefined;
		return /^\d+$/.test(value);
	}

	change(_event: Event) {
		this.addFeed = {
			url: this.addFeed.url,
			name: '',
			description: '',
			ttl: undefined,
			loadedURL: false,
			validURL: undefined
		}
	}

	loadRssFeed() {
		this.addFeed.validURL = undefined;
		fetch(this.addFeed.url).then(e => e.text()).then(str => new window.DOMParser().parseFromString(str, "text/xml")).then(data => {
			const channel = data.querySelector("channel");
			const items = data.querySelectorAll("item");
			if (channel && items) {
				this.addFeed.name = channel.querySelector("title")?.textContent ?? "";
				this.addFeed.description = channel.querySelector("description")?.textContent ?? "";
				this.addFeed.ttl = channel.querySelector("ttl")?.textContent ?? "";
				this.addFeed.loadedURL = true;
				this.addFeed.validURL = true;
			}
			else {
				this.addFeed.validURL = false;
			}
		})
	}


}
