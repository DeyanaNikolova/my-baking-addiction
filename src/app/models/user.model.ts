export interface User{
    _id: string;
    username: string;
    email: string;
    password: string;
    accessToken: string;
    recipe: string[];
    posts: string[];
}