import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  test: string = "header";

  constructor() { }

  ngOnInit(): void {
    this.test = "special-header";
  }

}
