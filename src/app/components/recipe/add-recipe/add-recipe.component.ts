import { Component, Input, OnInit } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent implements OnInit {

  recipes: Recipe[] = [];
 // recipe: Recipe | undefined;

  titleCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(35),
  ]);
  descriptionCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(50),
  ]);
  imageUrlCtrl = new FormControl('', [Validators.required]);
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
    description: this.descriptionCtrl,
    imageUrl: this.imageUrlCtrl,
    ingredients: this.ingredientsCtrl,
    instructions: this.instructionsCtrl,
    prepTime: this.prepTimeCtrl,
    cookTime: this.cookTimeCtrl,
    servings: this.servingsCtrl,
  });
  @Input() recipe: any;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  this.recipeService.getAllRecipes();
  }

  submit() {
    const value = this.recipeForm.value;
  
    this.recipeService.addRecipe(value).subscribe((recipe)=>{
      this.recipe = recipe;
      this.recipeForm.reset();
      this.router.navigate(['/recipes']);
    });
  }
}
