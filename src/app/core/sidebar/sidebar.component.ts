import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';
import { ADD_FEED_MUTATION } from '../../core/queries/addFeed';
@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	navigationIsOpen = false;
	popoverActive = false;
	msg = '';
	success: boolean | undefined = undefined;
	newFeedID: number | undefined = undefined;
	public feed: {
		url: string;
		name: string;
		description: string;
		ttl?: string;
		loadedURL: boolean;
		validURL?: boolean;
	} = {
		url: '',
		name: '',
		description: '',
		ttl: undefined,
		loadedURL: false,
		validURL: undefined,
	};

	constructor(private apollo: Apollo, private readonly keycloak: KeycloakService) {}

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
		this.navigationIsOpen = false;
		this.keycloak.isLoggedIn().then((loggedIn) => {
			if (loggedIn) {
				this.feed = {
					url: '',
					name: '',
					description: '',
					ttl: undefined,
					loadedURL: false,
					validURL: undefined,
				};
				this.msg = '';
				this.success = undefined;
				this.newFeedID = undefined;
				this.popoverActive = !this.popoverActive;
			} else {
				this.keycloak.login();
			}
		});
	}

	/**
	 * @author Jonas Eppard
	 * @summary Check if string is a number
	 * @description This function checks if a string is a number if input is undefined it returns undefined
	 * @param {string | undefined} value - value to check
	 * @returns {string | undefined} - returns the value if it is a number or undefined if value is undefined
	 */
	isInt(value: string | undefined): boolean | undefined {
		if (value === undefined) return undefined;
		return /^\d+$/.test(value);
	}

	/**
	 * @author Jonas Eppard
	 * @summary Reset Add Feed
	 * @description Called on Url input change will reset the add feed form
	 */
	urlChanged() {
		this.feed = {
			url: this.feed.url,
			name: '',
			description: '',
			ttl: undefined,
			loadedURL: false,
			validURL: undefined,
		};
	}

	/**
	 * @author Jonas Eppard
	 * @summary Check if URL is valid
	 * @description This function checks if a URL is valid and sets all Values of the add feed form
	 */
	loadRssFeed() {
		this.feed.validURL = undefined;
		fetch(this.feed.url)
			.then((e) => e.text())
			.then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
			.then((data) => {
				const channel = data.querySelector('channel');
				const items = data.querySelectorAll('item');
				if (this.isValidRSSFeed(channel, items)) {
					this.feed.name = channel!.querySelector('title')!.textContent!;
					this.feed.description = channel!.querySelector('description')!.textContent!;
					this.feed.ttl = channel!.querySelector('ttl')?.textContent ?? undefined;
					this.feed.loadedURL = true;
					this.feed.validURL = true;
				} else {
					this.feed.validURL = false;
				}
			});
	}
	/**
	 * @author Jonas Eppard
	 * @summary Check if RSS Feed is valid
	 * @description This function checks if a RSS Feed is valid while getting the <channel> and <item> tags
	 * @param {Element | null} channel - channel tag
	 * @param {NodeListOf<Element> | null} items - item tags
	 * @returns {boolean} - returns true if RSS Feed is valid
	 */
	isValidRSSFeed(channel: Element | null, items: NodeListOf<Element> | null): boolean {
		if (channel && items && items.length > 0) {
			if (channel.querySelector('title') && channel.querySelector('description')) {
				if (items.length > 0) {
					console.log(3);
					let itemsOk = true;
					items.forEach((item) => {
						if (!item.querySelector('title') || !item.querySelector('description')) {
							itemsOk = false;
						}
					});
					return itemsOk;
				}
			}
		}
		return false;
	}

	/**
	 * @author Jonas Eppard
	 * @summary Send request to add Feed
	 * @description This function sends a request to add a Feed to the server and displays the response
	 */
	addFeed() {
		if (!this.feed.loadedURL || !(this.isInt(this.feed.ttl) ?? true)) {
			return;
		}
		this.msg = '';
		this.success = undefined;
		this.apollo
			.mutate({
				mutation: ADD_FEED_MUTATION,
				variables: {
					feed: {
						link: this.feed.url,
						name: this.feed.name,
						description: this.feed.description,
						ttl: +(this.feed.ttl || 30),
					},
				},
			})
			.subscribe({
				next: (data) => {
					this.msg = 'Feed added';
					this.success = true;
					this.newFeedID = data.data!.createFeed.id;
				},
				error: (error) => {
					if (error.graphQLErrors[0].message.startsWith('duplicate key value violates unique constraint')) {
						this.msg = 'Feed already exists';
					} else {
						this.msg = 'Error adding feed';
					}
					this.success = false;
				},
			});
	}
}
