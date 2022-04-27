import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {
  @Input() icon: string = 'assets/icons/question-mark-outline';
  @Input() title: string = 'Card Title';

  constructor() { }

  ngOnInit(): void {
  }

}
