import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateRecipeComponent } from '../update-recipe/update-recipe.component';
import { PostComponent } from '../../post/post.component';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, RouterModule, PostComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRecipeDetails();
  }
  getRecipeDetails() {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];

    this.recipeService.getRecipeDetails(recipeId).subscribe((recipe) => {
      this.recipe = recipe;
      console.log(this.recipe);
    });
  }

  remove() {
    const id = this.activatedRoute.snapshot.params['recipeId'];
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }

  openModal(recipe?: Recipe) {
    const modalRef = this.modalService.open(UpdateRecipeComponent);
    modalRef.componentInstance.recipe = recipe;

    modalRef.result
      .then((result) => {
        if (result) {
          if (result._id) {
            this.update(result);
          }
        }
      })
      .catch();
  }

  update(recipe: Recipe) {
    this.openModal(recipe);
  }

  fillForm(recipe: Recipe) {
    this.openModal(recipe);
  }
}
