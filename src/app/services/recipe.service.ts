import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipe_url = environment.recipe_url;

  http = inject(HttpClient);

  constructor(private userService: UserService) { }

  getAllRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipe_url + '/recipes');
  }

  getRecipeDetails(id: string): Observable<Recipe>{
    return this.http.get<Recipe>(`${this.recipe_url}/recipes/${id}`);
  }

  addRecipe( recipe: Recipe): Observable<Recipe>{
   
    // const recipe = {
    //   title,
    //   shortDescription,
    //   imageUrl,
    //   ingredients,
    //   instructions,
    //   prepTime,
    //   cookTime,
    //   servings
    // };

    const options = this.userService.authHeaders();

    return this.http.post<Recipe>(this.recipe_url + '/recipes', recipe, options );
  }
}
