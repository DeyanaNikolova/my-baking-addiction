import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit{
recipe: Recipe | undefined;

constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute){}

ngOnInit(): void {
  this.getRecipeDetails();
}
getRecipeDetails(){
  const recipeId = this.activatedRoute.snapshot.params['recipeId']
  console.log(recipeId);
  
  this.recipeService.getRecipeDetails(recipeId).subscribe((recipe)=>{
    this.recipe = recipe;
    console.log(this.recipe);    
  })
}
}
