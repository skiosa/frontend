import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
  @Input() articleTitle = '';
  @Input() articleDescription = '';
  @Input() colorSeed = 0;

  /**
   * @author Amos Gross
   * @summary fetches color for article
   * @description preliminary solution for generating colored articles
   * @returns {string} css class for color
   */
  getColor(): string {
    switch (this.colorSeed % 4) {
      case 0:
        return 'article-color-a';
      case 1:
        return 'article-color-b';
      case 2:
        return 'article-color-c';
      case 3:
        return 'article-color-d';
      default:
        return 'article-color-a';
    }
  }
}
