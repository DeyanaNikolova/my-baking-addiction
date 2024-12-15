import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipe_url = environment.recipe_url;

  http = inject(HttpClient);

  constructor(private userService: UserService, private authService: AuthService) {}

  getRecipeDetails(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipe_url}/${recipeId}`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    const options = this.userService.authHeaders();
    return this.http.post<Recipe>(this.recipe_url, recipe, options);
  }

  updateRecipe(recipe: Recipe, recipeId: string): Observable<Recipe> {
    const options = this.userService.authHeaders();
    return this.http.put<Recipe>(`${this.recipe_url}/${recipeId}`, recipe, options);
  }

  deleteRecipe(recipeId: string): Observable<any>{
    const options = this.userService.authHeaders();
    return this.http.delete(`${this.recipe_url}/${recipeId}`, options);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipe_url);
  }
}
