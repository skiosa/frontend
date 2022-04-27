import { Article } from 'skiosa-orm';
import { PartialExcept, RecursivePartial } from './types';

type A = RecursivePartial<Article>
type B = A['feed'];
type C = PartialExcept<Article, 'title' | 'content'>;
type D = C['feed']