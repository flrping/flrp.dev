export interface Post {
    title: string;
    slug: string;
    date: Date;
    tags: string[];
    content: string;
    banner: boolean;
}