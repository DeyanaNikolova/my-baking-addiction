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
  @Input() currentUserId!: string;
  @Input() recipeId: string = this.activatedRoute.snapshot.params['recipeId'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  comments: Comment[] = [];
  @Input() replyId: string | null = null;

  ngOnInit(): void {
    this.getRelarion();
    this.getCommensByRecipe();
  }

  getAll() {
    this.commentService.getAll().subscribe((comments) => {
      console.log(comments);
    });
  }
  getRelarion(){
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    this.commentService.getCommentsRelation(recipeId).subscribe(comments=>{
      console.log(comments);   
    });
  }

  getCommensByRecipe() {
    const id = this.activatedRoute.snapshot.params['recipeId'];
    this.commentService.getAllCommentsByRecipeId(id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  addComment({ recipeId, text }: { recipeId: string; text: string }): void {
    const id = this.activatedRoute.snapshot.params['recipeId'];
    const username = this.userService.user?.username;

    this.commentService.addComment(id, text).subscribe((ctreatedComment) => {
      this.comments = [...this.comments, ctreatedComment];
    });
  }
}
