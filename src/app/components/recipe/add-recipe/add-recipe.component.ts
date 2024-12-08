import { Component } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {

recipeTitle: string = '';


  titleCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(35),
  ]);
  shortDescriptionCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(150),
  ]);
  imageUrlCtrl = new FormControl( '', [Validators.required]);
  ingredientsCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(50),
  ]);
  instructionsCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(50),
  ]);
  prepTimeCtrl = new FormControl('', [Validators.required]);
  cookTimeCtrl = new FormControl('', [Validators.required]);
  servingsCtrl = new FormControl(0, [Validators.required]);

  recipeForm: FormGroup = new FormGroup({
    title: this.titleCtrl,
    shortDescription: this.shortDescriptionCtrl,
    imageUrl: this.imageUrlCtrl,
    ingredients: this.ingredientsCtrl,
    instructions: this.instructionsCtrl,
    prepTime: this.prepTimeCtrl,
    cookTime: this.cookTimeCtrl,
    servings: this.servingsCtrl,
  });

  constructor(private recipeService: RecipeService, private router: Router) {}

  fillForm(recipe: Recipe){
    this.titleCtrl.setValue(recipe.title);
    this.shortDescriptionCtrl.setValue(recipe.shortDescription);
    this.imageUrlCtrl.setValue(recipe.imageUrl);
    this.ingredientsCtrl.setValue(recipe.ingredients);
    this.instructionsCtrl.setValue(recipe.instructions);
    this.prepTimeCtrl.setValue(recipe.prepTime);
    this.cookTimeCtrl.setValue(recipe.cookTime);
    this.servingsCtrl.setValue(recipe.servings);
  }

  submit() {
    const value = this.recipeForm.value;
console.log(value);

   this.recipeService.addRecipe(value).subscribe(()=>{
    this.router.navigate(['/recipes'])
   });
  }
}
