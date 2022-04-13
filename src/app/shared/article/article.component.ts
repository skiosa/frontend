import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    @Input() articleTitle = ''
    @Input() articleDescription = ''
    @Input() colorSeed = 0

    constructor() { }

    ngOnInit(): void {
    }

    getColor(): string {
        switch(this.colorSeed % 4) {
            case 0:
                return "article-color-a"
            case 1:
                return "article-color-b"
            case 2:
                return "article-color-c"
            case 3:
                return "article-color-d"
            default:
                return "article-color-a"
        }
    }

}
