import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RouterModule } from '@angular/router';
import { MyDatePipe } from '../../pipes/date.pipe';


@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterModule, MyDatePipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}
 
  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.recipeService.getAllRecipes().subscribe((recipes)=>{
      this.recipes = recipes;
    });
  }
}
