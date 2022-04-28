import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedOverviewPageComponent } from './feed-overview-page.component';

describe('FeedOverviewPageComponent', () => {
	let component: FeedOverviewPageComponent;
	let fixture: ComponentFixture<FeedOverviewPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FeedOverviewPageComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedOverviewPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
