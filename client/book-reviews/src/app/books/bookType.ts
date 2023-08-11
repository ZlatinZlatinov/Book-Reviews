import { Comment } from "./commentType";


export interface Book {
    _id: string,
    title: string,
    author: string,
    genre: string,
    img: string,
    review: string,
    createdAt: string,
    likes: string[],
    comments: Comment,
    ownerId: string
}