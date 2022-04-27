import { Component, Input, OnInit } from '@angular/core';
import {
	DEFAULT_PASTEL_COLOR,
	generateRandomColor,
} from 'src/app/core/utils/randomColor';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
	@Input() articleTitle = '';
	@Input() articleDescription = '';
	@Input() colorSeed = 0;
	color: string = DEFAULT_PASTEL_COLOR;

	ngOnInit(): void {
		this.color = generateRandomColor(this.colorSeed);
	}
}
