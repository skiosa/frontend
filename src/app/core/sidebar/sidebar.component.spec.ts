import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SidebarComponent],
			providers: [
				{ provide: Apollo, useValue: {} },
				{ provide: KeycloakService, useValue: {} },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('#isInt() should return true for integers', () => {
		expect(component.isInt('1')).toBe(true);
		expect(component.isInt('0')).toBe(true);
		expect(component.isInt(' ')).toBe(false);
		expect(component.isInt('1 ')).toBe(false);
		expect(component.isInt('1.0')).toBe(false);
		expect(component.isInt(undefined)).toBe(undefined);
	});
	it('#urlChanged() to reset feed', () => {
		component.feed.name = 'test';
		component.feed.description = 'test';
		component.feed.ttl = '10';
		component.urlChanged();
		expect(component.feed.name).toBe('');
		expect(component.feed.description).toBe('');
		expect(component.feed.ttl ?? 'undefined').toBe('undefined');
	});
	it('#isValidRSSFeed() should return true for valid RSS Feeds', () => {
		const validXML =
			'<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>test</title><link>test</link><description>test</description><item><title>test</title><link>test</link><description>test</description></item></channel></rss>';
		const validXMLDoc = new DOMParser().parseFromString(validXML, 'text/xml');
		const validChannel = validXMLDoc.querySelector('channel');
		const validItem = validXMLDoc.querySelectorAll('item');
		expect(component.isValidRSSFeed(validChannel, validItem)).toBe(true);
	});
	it('#isValidRSSFeed() should return false for invalid RSS Feeds', () => {
		const invalidXML =
			'<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>test</title><link>test</link><description>test</description><item></item></channel></rss>';
		const invalidXMLDoc = new DOMParser().parseFromString(invalidXML, 'text/xml');
		const invalidChannel = invalidXMLDoc.querySelector('channel');
		const invalidItem = invalidXMLDoc.querySelectorAll('item');
		expect(component.isValidRSSFeed(invalidChannel, invalidItem)).toBe(false);
	});
});
