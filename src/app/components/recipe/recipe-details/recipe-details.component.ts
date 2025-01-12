import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateRecipeComponent } from '../update-recipe/update-recipe.component';
import { CommentFormComponent } from '../../comments/comments/comment-form/comment-form.component';
import { CommentsComponent } from "../../comments/comments/comments.component";
import { UserService } from '../../../services/user.service';





@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentFormComponent, CommentsComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipeId: string = this.activatedRoute.snapshot.params['recipeId'];
  // @Output() recipeId = new EventEmitter<Recipe>();
  recipe: Recipe | undefined;
  recipes: Recipe[] = [];
  isRecipeOwner: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getRecipeDetails(); 
  }

  getRecipeDetails() {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    this.recipeService.getRecipeDetails(recipeId).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
  get isOwner(): boolean{
    const currentUser = this.userService.user;
    if(currentUser?._id === this.recipe?._ownerId){
      return this.isRecipeOwner = true;
    }
    else{
      return this.isRecipeOwner = false;
    }  
  }

  get isAuthenticated(): boolean {
    return this.userService.isLogged;
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
