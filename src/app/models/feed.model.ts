import { Article } from "./article.model";
import { Category } from "./category.model";
import { User } from "./user.model";
export declare class Feed {
    id: number;
    link: string;
    ttl: number;
    name: string;
    description: string;
    lastPolledAt: Date;
    articles?: Article[];
    categories?: Category[];
    subscribers?: User[];
}
