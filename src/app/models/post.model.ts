import { Recipe } from "./recipe.model";
import { User } from "./user.model";

export interface Post{
    _id: string;
    _ownerId: User;
    title: string;
    text: string;
    recipeId: Recipe;
    _createdOn: string;
    _updatedOn: string;
}