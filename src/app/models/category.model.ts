import { Article } from "./article.model";
import { Feed } from "./feed.model";
import { User } from "./user.model";
export declare class Category {
    id: number;
    name: string;
    articles?: Article[];
    feeds?: Feed[];
    users?: User[];
}
