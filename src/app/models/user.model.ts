import { Feed } from "./feed.model";
import { Article } from "./article.model";
import { Category } from "./category.model";
export declare class User {
    id: string;
    subscriptions?: Feed[];
    bookmarks?: Article[];
    likes?: Article[];
    preferences?: Category[];
}
