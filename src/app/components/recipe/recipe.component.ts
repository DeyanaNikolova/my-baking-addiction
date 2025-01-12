import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RouterModule } from '@angular/router';
import { MyDatePipe } from '../../pipes/date.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterModule, MyDatePipe, SpinnerComponent, CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  recipes: Recipe[] = [];
  isLoading: boolean = true;

  constructor(private recipeService: RecipeService) {}
 
  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.recipeService.getAllRecipes().subscribe({
      next:recipes=>{
        this.recipes = recipes;
        this.isLoading = false;
      },
      error: (err)=>{
        this.isLoading = false;
        console.error(`Error: ${err}`);    
      }  
    });
  }
}
