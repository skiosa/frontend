import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() value?: string = '';
  @Input() disabled: boolean = false;
  @Input() valid?: boolean = undefined;
  @Input() errorMessage: string = '';
  @Input() hasContent: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() clickEnd = new EventEmitter<MouseEvent>();


  constructor() { }

  change(e: any) {
    this.value = e;
    this.valueChange.emit(e);
  }
  clickedEnd(event: MouseEvent) {
    this.clickEnd.emit(event);
  }
}
