import { Author } from "./author.model";
import { Category } from "./category.model";
import { Feed } from "./feed.model";
import { User } from "./user.model";
export declare class Article {
    id: number;
    title: string;
    description: string;
    content: string;
    url: string;
    publishedAt: Date;
    author?: Author;
    feed?: Feed;
    categories?: Category[];
    likes?: User[];
    bookmarks?: [User];
}
