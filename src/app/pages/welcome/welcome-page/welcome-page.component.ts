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
  seed: number = Math.random()

  ngOnInit(): void {
      this.recomendationService.getGeneralArticles(this.seed, 0, 10).subscribe(articles => this.recommendedArticles = articles)
  }

  /**
    * @author Amos Gross
    * @summary shortens text to 80 chars
    * @description shortens a given string down and adds '...' if needed
    * @param {string} text - string to shorten
    * @returns {string} shortened text
    */
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
