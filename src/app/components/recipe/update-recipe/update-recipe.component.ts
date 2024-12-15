import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.css',
})
export class UpdateRecipeComponent implements OnInit {
  recipeId: string = '';
  constructor(
    private recipeService: RecipeService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  @Input() recipe: any;

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

  ngOnInit() {
    if (this.recipe) {
      this.titleCtrl.setValue(this.recipe.title);
      this.descriptionCtrl.setValue(this.recipe.description);
      this.imageUrlCtrl.setValue(this.recipe.imageUrl);
      this.ingredientsCtrl.setValue(this.recipe.ingredients);
      this.instructionsCtrl.setValue(this.recipe.instructions);
      this.prepTimeCtrl.setValue(this.recipe.prepTime);
      this.cookTimeCtrl.setValue(this.recipe.cookTime);
      this.servingsCtrl.setValue(this.recipe.servings);
    }
  }

  submit() {
    const value = this.recipeForm.value;
    const id = this.recipe._id;
    this.recipeService.updateRecipe(value, id).subscribe((recipe) => {
      this.recipe = recipe;
      this.router.navigate(['/recipes']);
    });
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close();
  }
}
