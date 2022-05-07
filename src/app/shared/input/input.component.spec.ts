import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit valueChange', () => {
		const value = 'test';
		component.valueChange.subscribe((val) => {
			expect(val).toBe(value);
		});
		component.change(value);
	});
	it('should change value', () => {
		const value = 'test';
		component.change(value);
		expect(component.value).toBe(value);
	});
});
