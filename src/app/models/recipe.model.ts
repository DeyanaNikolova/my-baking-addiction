import { Time } from "@angular/common";
import { User } from "./user.model";

export interface Recipe{
    _id: string;
    title: string;
    shortDescription: string;
    imageUrl: URL;
    ingredients: string;
    instructions: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    owner: User;
    _createdOn: Time;
    _ownerId: User; 
}