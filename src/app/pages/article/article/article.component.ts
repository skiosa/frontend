import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
  @Input() title = 'How installing linux made me gain 20lbs of muscle';
  @Input() description =
    'After installing arch linux, I did one pushup every time I told someone, that I use it by the way. And it worked!';
}
