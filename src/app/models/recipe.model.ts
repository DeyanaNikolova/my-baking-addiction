import { Time } from "@angular/common";
import { User } from "./user.model";

export interface Recipe{
    _id: string;
    title: string;
    shortDescription: string;
    imageUrl: string;
    ingredients: string;
    instructions: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    _createdOn: string;
    _updatedOn: string;
    _ownerId: User; 
}