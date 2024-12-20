
import { User } from "./user.model";

export interface Recipe{
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string;
    instructions: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    _ownerId: User;
    _createdOn: string;
    _updatedOn: string;
    comments: string[];
}