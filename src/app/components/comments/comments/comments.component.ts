import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { Comment } from '../../../models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() currentUserId: string | undefined = this.userService.user?._id;
 @Input() recipeId: string = this.activatedRoute.snapshot.params['recipeId'];
//  @Input() username: string | undefined = this.userService.user?.username;
 constructor(
   private activatedRoute: ActivatedRoute,
   private commentService: CommentService,
   private userService: UserService
  ) {}
  @Input() comment: Comment | undefined;
  comments: Comment[] = [];
  canComment: boolean = false;
  
  ngOnInit(): void {
    this.getCommensByRecipe();
   
  }
  
  hasCommented(){
    if(this.userService.user?._id === this.comment?.userId){
      this.canComment = false;
    }else{
      this.canComment = true;
    }
  }
  getAll() {
    this.commentService.getAll().subscribe((comments) => {
    });
  }
  getRelarion() {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    this.commentService.getCommentsRelation(recipeId).subscribe(() => {
      console.log('Relation created');
    });
  }
  
  getCommensByRecipe() {
    const id = this.activatedRoute.snapshot.params['recipeId'];
    this.commentService.getAllCommentsByRecipeId(id).subscribe((comments) => {
      this.comments = comments;
    });
  }
  
  addComment({ recipeId, text }: { recipeId: string; text: string }): void {
    recipeId = this.activatedRoute.snapshot.params['recipeId'];    
    this.commentService.addComment(recipeId, text).subscribe((createdComment) => {
      this.comment = createdComment;
      this.comments = [...this.comments, createdComment];
    });
  }

  get isAuthentivated(): boolean{
    return this.userService.isLogged;
  }
}
