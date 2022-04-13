import { Component, OnInit } from '@angular/core';
import { Article } from 'skiosa-orm';
import { RecomendationService } from 'src/app/core/services/recomendation.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  constructor(private recomendationService: RecomendationService) { }

  public recommendedArticles: Article[] = []

  ngOnInit(): void {
      this.recomendationService.getGeneralArticles().subscribe(articles => this.recommendedArticles = articles)
  }

  public shortenedText(text: string): string {
      if (text.length <= 80) {
          return text
      }
      else {
         let trimLen = 77;
         while (text.charAt(trimLen) !== ' ' || trimLen === 0) {
             trimLen--
         }

         return text.substring(0, trimLen) + '...'
      }
  }

}
